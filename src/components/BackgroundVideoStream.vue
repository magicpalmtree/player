<template>
    <video
        ref="videoEl"
        playsinline="1"
        preload="metadata"
        :muted="muted"
        disablepictureinpicture
        class="streaming-video bg-black w-full h-full"
        :volume="volume"
    ></video>
</template>

<script setup>
import Hls from 'hls.js';
import { ref, onMounted, watch, computed } from 'vue';
import usePlayer from '../hooks/usePlayer';
import useMedia from '../hooks/useMedia';
import useNode from '../hooks/useNode'
import useProject from '../hooks/useProject';
import useAnalytics from '../hooks/useAnalytics';
import useConfig from '../hooks/useConfig';
import useApi from '../hooks/useApi';

const { activeNodeId, nextNodeId } = useNode();
const { cacheList } = useMedia();
const { project }  = useProject();
const { playing, setDuration, setCurrentTime, setEnded, setSkipToTime, skipToTime, muted, volume, minsAllowed, setExpired } = usePlayer();
const { analytics } = useAnalytics();
const { previewNodeId, context } = useConfig();
const { decreaseOverageMins } = useApi();

const props = defineProps({
    media: {},
    nodeId:{},
    loopEnabled: false
});

const videoEl = ref(null);
const hls = ref(false);

const analytics_fired = ref(0);
const analytics_percentages = ref([]);
let timer = ref(false);
let timerPlayed = ref(0);

// --- Status List ---
// not-mounted
// not-loaded
// loading
// loaded
const status = ref('not-mounted');

const isActive = computed(() => {
    return props.nodeId === activeNodeId.value
});

const isPlaying = computed(()=>{
    videoEl.value.currentTime > 0 && !videoEl.value.paused && !videoEl.value.ended 
    && videoEl.value.readyState > videoEl.value.HAVE_CURRENT_DATA;
})

const canPlayHlsNatively = computed(() => {
    return videoEl.value.canPlayType('application/vnd.apple.mpegurl');
});

const preload = (list) => {
    if(! list) return;
    if(! Hls.isSupported()) {
        console.log('Hls is not supported here.');
        if(canPlayHlsNatively.value) {
            videoEl.value.src = props.media.manifest_url;
        }
    } else if (status.value === 'not-loaded' && list.includes(props.media.id)) {
        hls.value = new Hls({
            startFragPrefetch: true,
        });
        hls.value.loadSource(props.media.manifest_url);
        status.value = 'loading';

        hls.value.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        });

        hls.value.on(Hls.Events.FRAG_LOADED, (event, data) => {
            if(status.value !== 'attached') status.value = 'loaded';
        });

        hls.value.on(Hls.Events.ERROR, (event, data) => {
            // console.warn('Hls errored ..........\n', data);
        });
    }
};

watch(cacheList, (newList) => {
    preload(newList);
});

watch(skipToTime, (newVal)=>{
    if(newVal && isActive.value){
        videoEl.value.currentTime = newVal;
        setCurrentTime(newVal);
        setSkipToTime(0);
    }
})

watch(nextNodeId, (id) => {
    if(id === props.nodeId){
        attachMedia();
        videoEl.value.currentTime = '0';
    }
})

onMounted(() => {
    status.value = 'not-loaded';
    preload(cacheList);

    const startNodeId = previewNodeId.value ? previewNodeId.value : project.value.start_node_id;
    if(startNodeId === props.nodeId){
        attachMedia();
    }
});

const attachMedia = () => {
    if(!Hls.isSupported()) {
        addListeners();
        return ;
    }

    if(status.value === 'attached' || status.value === 'attaching') return;
    hls.value.attachMedia(videoEl.value);
    status.value = "attaching";
    hls.value.on(Hls.Events.MEDIA_ATTACHED, () => {
        status.value = "attached";
        addListeners();
    });
}

watch(playing, (newVal) => {
    if (isActive.value) {
        if (newVal) {
            videoEl.value.play();
            timer = setInterval(() => {
                timerPlayed.value += 1;
            }, 1000);
        } else {
            videoEl.value.pause();
            if(timer)
                clearInterval(timer);
        }
    }
});

watch(timerPlayed, async (newVal) => {
    if(newVal > 0 && newVal % 60 == 0 && context.value !== 'preview') {
        // analytics.value.decreaseMins(project.value.user_id);
        analytics.value.recordMins(props.nodeId, project.value.id, project.value.user_id);
        decreaseOverageMins(project.value.user_id);
    }
});

const addListeners = () => {
    videoEl.value.addEventListener('loadedmetadata', () => {        
        setDuration(videoEl.value.duration);
        setAnalyticsPercentages(videoEl.value.duration);
    });
    videoEl.value.addEventListener('timeupdate', (event) => {        
        setCurrentTime(event.target.currentTime);
        handleTimeUpdate(event.target.currentTime);
    });
    videoEl.value.addEventListener('ended', async (event) => {
        if(props.loopEnabled) {
            videoEl.value.play();
        } else {
            setEnded(true);   
            if(timerPlayed.value > 0 && timerPlayed.value % 60 > 0 && context.value !== 'preview') {
                // analytics.value.decreaseMins(project.value.user_id);
                analytics.value.recordMins(props.nodeId, project.value.id, project.value.user_id);
                decreaseOverageMins(project.value.user_id);
            }
        }
    });

    const mediaVeiwed = ref(false);
    videoEl.value.addEventListener('playing', (event) => {
        if(mediaVeiwed.value) return;
        mediaVeiwed.value = true;
        analytics.value.mediaView(props.media);
    });
}

watch(status, (val) => {
    console.log('Media Id : ' + props.media.id + ' : ' + val);
});

watch(muted, (val) => {   
    videoEl.value.muted = val;
});

watch(volume, (val) => {
    videoEl.value.volume = val;
    if(val == 0) {
        videoEl.value.muted = true;
    } else {
        videoEl.value.muted = false;
    }
});

const setAnalyticsPercentages = (duration) => {
    const onePercent = duration / 100;
    analytics_percentages.value = [
        onePercent * 10,
        onePercent * 20,
        onePercent * 30,
        onePercent * 40,
        onePercent * 50,
        onePercent * 60,
        onePercent * 70,
        onePercent * 80,
        onePercent * 90
    ];
}

const handleTimeUpdate = (time) => {
    if (isActive.value) {
        if ( time > analytics_percentages.value[analytics_fired.value]) {
            const percent = (analytics_fired.value + 1) * 10;
            analytics.value.nodeViewDuration(
                percent + '%',
                props.nodeId
            );
            analytics_fired.value += 1;
        }
    }
}

</script>

<style lang="scss" scoped>
.streaming-video {
    max-width: 100%;
}
</style>
