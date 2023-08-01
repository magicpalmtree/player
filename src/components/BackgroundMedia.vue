<template>
    <div
        class="video_wrapper z-10 bg-black"
    >
        <BackgroundColor 
            v-if="isSolidColor" 
            :bgColor="node.background_color"
            :nodeId="node.id"
            :duration="node?.duration"
            :loopEnabled="node?.completeAction == 'loop'"
        />
        <BackgroundImage 
            v-else-if="media && media.is_image" 
            :media="media"
            :nodeId="node.id"
            :duration="node?.duration"
            :loopEnabled="node?.completeAction == 'loop'"
        />
        <BackgroundVideoStream
            v-else-if="media && media.manifest_url"
            :media="media"
            :nodeId="node.id"
            :loopEnabled="node?.completeAction == 'loop'"
        />
        <BackgroundVideoFile 
            v-else 
            :media="media"
            :nodeId="node.id"
            :loopEnabled="node?.completeAction == 'loop'"
        />
    </div>
</template>

<script setup>
import BackgroundColor from './BackgroundColor.vue';
import BackgroundImage from './BackgroundImage.vue';
import BackgroundVideoStream from './BackgroundVideoStream.vue';
import BackgroundVideoFile from './BackgroundVideoFile.vue';
import usePlayer from '../hooks/usePlayer';
import useMedia from '../hooks/useMedia';
import {computed} from 'vue'

const props = defineProps({
    node: {}
});

const {medias } = useMedia();
const media = computed(()=>{    
    return medias.value[ props.node.media_id ];
});

const isSolidColor = computed(() => {
    return props.node.media_id > 0 ? false : true;
});

</script>


<style>
.active {
    z-index: 30;
}
.next {
    z-index: 20;
}
.video_wrapper {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
