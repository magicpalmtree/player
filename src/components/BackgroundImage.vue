<template>
    <img :src="media.thumbnail_url" class="_image" />
</template>

<script setup>

import { ref, watch, computed, onMounted } from 'vue';
import usePlayer from '../hooks/usePlayer';
import useNode from '../hooks/useNode'
import useAnalytics from '../hooks/useAnalytics';
import useConfig from '../hooks/useConfig';
import useProject from '../hooks/useProject';

let timer = ref(false);
let currentTime = ref(0.0);
let paused = ref(false);
const analytics_fired = ref(0);
const analytics_percentages = ref([]);

const { playing, setDuration, setCurrentTime, setEnded, setSkipToTime, skipToTime } = usePlayer();
const { activeNodeId, nextNodeId } = useNode();
const { analytics } = useAnalytics();
const { previewNodeId } = useConfig();
const { project }  = useProject();

const props = defineProps({
    media: {},
    nodeId:{},
    duration:{},
    loopEnabled: false
});

const isActive = computed(() => {
    return props.nodeId === activeNodeId.value
});

watch(nextNodeId, (id) => {
  if(id === props.nodeId){
    setDuration(props.duration);
    currentTime.value = 0;
    setAnalyticsPercentages(props.duration);
  }
})

onMounted(() => {
  const startNodeId = previewNodeId.value ? previewNodeId.value : project.value.start_node_id;
  if(startNodeId === props.nodeId){
    setDuration(props.duration);
    setAnalyticsPercentages(props.duration);
    currentTime.value = 0;
  }
});

watch(skipToTime, (newVal)=>{
  if(newVal && isActive.value){
    currentTime.value = newVal;
    setCurrentTime(newVal);
    setSkipToTime(0);
  }
})

watch(playing, (newVal) => {
  if (isActive.value) {
    if (newVal) {
      timer = setInterval(() => {
        if(! paused.value) {
          currentTime.value += 0.2;
          setCurrentTime(currentTime.value);
        }
      }, 200);
    } else {
      if(timer)
        clearInterval(timer);
    }
  }
});

watch(currentTime, (newVal) => {
  handleTimeUpdate(currentTime.value);
  if(newVal > props.duration) {
    paused.value = true;
    setCurrentTime(0);
    currentTime.value = 0;
    if(!props.loopEnabled) {
      setEnded(true);
      if(timer) clearInterval(timer);
    } else {
      setTimeout(() => {
        paused.value = false;
      }, 400)
    }
  }
})

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

<style scoped>
._image {
    width: 100%;
    height: 100%;
}
</style>