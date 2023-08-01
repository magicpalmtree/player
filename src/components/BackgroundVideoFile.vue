<template>
    <video
        ref="videoEl"
        playsinline="1"
        preload="metadata"
        :muted="muted"
        disablepictureinpicture
        class="mp4-video bg-black w-full h-full"
        :volume="volume"
    ></video>
</template>

<script setup>

import { ref, onMounted, watch, computed } from 'vue';
import usePlayer from '../hooks/usePlayer';
import useMedia from '../hooks/useMedia';
import useNode from '../hooks/useNode'
import useProject from '../hooks/useProject';
import useAnalytics from '../hooks/useAnalytics';
import useConfig from '../hooks/useConfig';

const { activeNodeId, nextNodeId } = useNode();
const { cacheList } = useMedia();
const { project }  = useProject();
const { playing, setDuration, setCurrentTime, setEnded, setSkipToTime, skipToTime, muted, volume } = usePlayer();
const { analytics } = useAnalytics();
const { previewNodeId } = useConfig();

const props = defineProps({
    media: {},
    nodeId:{},
    loopEnabled: false
});

const videoEl = ref(null);
const analytics_fired = ref(0);
const analytics_percentages = ref([]);

const isActive = computed(() => {
    return props.nodeId === activeNodeId.value
});

const isPlaying = computed(()=>{
    videoEl.value.currentTime > 0 && !videoEl.value.paused && !videoEl.value.ended 
    && videoEl.value.readyState > videoEl.value.HAVE_CURRENT_DATA;
})

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
    }
})

onMounted(() => {
    const startNodeId = previewNodeId.value ? previewNodeId.value : project.value.start_node_id;
    if(startNodeId === props.nodeId){
        attachMedia();
    }
});

const attachMedia = () => {
    videoEl.value.src = props.media.url;
    
    videoEl.value.addEventListener('loadedmetadata', () => {
        setDuration(videoEl.value.duration);
        setAnalyticsPercentages(videoEl.value.duration);
    });
    videoEl.value.addEventListener('timeupdate', (event) => {
        setCurrentTime(event.target.currentTime);
        handleTimeUpdate(event.target.currentTime);
    });
    videoEl.value.addEventListener('ended', (event) => {
        if(props.loopEnabled) {
            videoEl.value.play();
        } else setEnded(true);
    });

    const mediaVeiwed = ref(false);
    videoEl.value.addEventListener('playing', (event) => {
        if(mediaVeiwed.value) return;
        mediaVeiwed.value = true;
        analytics.value.mediaView(props.media);
    });
}

watch(playing, (newVal) => {
    if (isActive.value) {
        if (newVal) {
            videoEl.value.play();
        } else {
            videoEl.value.pause();
        }
    }
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
.mp4-video {
    max-width: 100%;
}
</style>
