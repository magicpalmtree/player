<template >
    <div @click="$emit('click')" class="_wrapper">
        <!-- <icon :icon="'pause'" :class="[{active: isPlaying }, 'playthrough_icon']" />
        <icon :icon="'play'" :class="[{active: !isPlaying }, 'playthrough_icon']" />-->
        <svg-icon icon-name="play" :class="[{active: !isPlaying }, 'playthrough_icon']">
            <play-icon />
        </svg-icon>
        <svg-icon icon-name="pause" :class="[{active: isPlaying }, 'playthrough_icon']">
            <pause-icon />
        </svg-icon>
    </div>
</template>

<script>
import PlayIcon from '../../icons/PlayIcon.vue';
import PauseIcon from '../../icons/PauseIcon.vue';
export default {
    components: {
        PlayIcon,
        PauseIcon
    },
    name: 'PlayToggleIcon',
    props: {
        playing: {
            type: Boolean,
            required: true
        }
    },

  mounted(){
      this.isPlaying = this.playing;
  },

    data() {
        return {
            isPlaying: false
        };
    },

    computed: {
        playIcon() {
            return this.$refs.play;
        },
        pauseIcon() {
            return this.$refs.pause;
        }
    },

    watch: {
        playing(newVal) {
            this.togglePlaying(newVal);
        }
    },

    methods: {
        togglePlaying(playing) {
            this.isPlaying = playing;
        }
    }
};
</script>

<style lang="scss" scoped>
._wrapper {
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.playthrough_icon {
    display: block;
    position: absolute;
    // top: 4px;
    left: 5px;
    transform: translateY(50px);
    opacity: 0;
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;

    &.active {
        opacity: 1;
        transform: translateY(0);
    }

    // @media (max-width: 500px) {
    //     top: 5px
    // }
}
</style>