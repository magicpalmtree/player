<template>
    <div
        v-if="Object.keys(videos).length"
        class="videos"
        @mouseenter="$emit('mouseenter')"
        @mouseleave="$emit('mouseleave')"
        @click="$emit('click')"
    >

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BackgroundVideo from './BackgroundVideo.vue';
import BackgroundImage from './BackgroundImage';
import BackgroundColor from "@components/player/Videos/BackgroundColor";

export default {
    name: 'VideoQueue',
    components: { },
    props: {
        startVideo: {},
    },
    computed: {
        ...mapGetters(['videos', 'videoQueue']),
    },
};
</script>

<style scoped>
.videos {
    width: 100% !important;
    height: 100% !important;
}
</style>

