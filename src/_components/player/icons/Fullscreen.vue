<template>
    <!-- <icon
        :name=" inFullScreen ? 'compress-wide' : 'expand-wide'"
        class="clickable"
        v-tooltip.top-end="'Full Screen'"
        @click="$emit('click')"
    />-->
    <svg-icon
        title="fullscreen-icon"
        class="clickable"
        v-tooltip.top-end="'Full Screen'"
        @click="$emit('click')"
    >
        <fullscreen-icon />
    </svg-icon>
</template>

<script>
import FullscreenIcon from '../../icons/FullscreenIcon.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Fullscreen',
    components: {
        FullscreenIcon
    },
    computed: {
        ...mapGetters(['inFullScreen'])
    }
};
</script>