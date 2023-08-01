<template>
    <div class="absolute top-0 bottom-0 left-0 right-0 z-50">
        <!-- Z Index 5100 -->
        <cant-play-msg v-if="cantPlay" />
        <!-- Z Index 5000 -->
        <Loader v-if="buffering" />

        <!-- Z Index 4500 -->
        <autoplay-volume v-if="showAutoplayVolume" />

        <!-- Z Index 4500 -->
        <cover
            v-if="showTheCover"
            :played="played"            
            @firstPlay="handleFirstPlay"
            class="cover"
        />

        <!-- Z Index 4100 -->
        <Chapters v-if="project.chapters" />

        <!-- Z Index 4000 -->
        <ShareIcons v-if="project.allow_share" />
        <control-bar />

        <div
            v-if="volumeControlOpen"
            class="absolute top-0 bottom-0 left-0 right-0 z-50"
            @click="setVolumeControlOpen(false)"
        />

        <video-brand v-if="project.branding_image_src" :image="project.branding_image_src"></video-brand>

        <slot />
    </div>
</template>

<script setup>

import { ref, computed, watch } from 'vue';
import AutoplayVolume from './AutoplayVolume.vue';
import CantPlayMsg from './CantPlayMsg.vue';
import Chapters from './Chapters.vue';
import ControlBar from './ControlBar.vue';
import Cover from './Cover.vue';
import Loader from './Loader.vue';
import ShareIcons from './ShareIcons.vue';
import VideoBrand from './VideoBrand.vue';
import usePlayer from '../hooks/usePlayer';
import useProject from '../hooks/useProject';
import useAnalytics from '../hooks/useAnalytics';

const { cantPlay, buffering, volumeControlOpen, setVolumeControlOpen, playing, setPlaying, played, setPlayed } = usePlayer();
const { project } = useProject();
const { analytics } = useAnalytics();

const showTheCover = computed(() => {
    if(! project.value.autoplay && ! playing.value && ! played.value) return true;
    return false;
});

const showAutoplayVolume = computed(() => {
    if(project.value.autoplay) return true;
    return false;
});

const handleFirstPlay = () => {
    setPlaying(true);
    setPlayed(true);
}

watch(played, (newVal) => {
    if(newVal) {
        analytics.value.view();  
    }
})

</script>

<style lang="scss" scoped></style>
