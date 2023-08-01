<template>
  <div class="_autoplay-cover" @click="handleUnmute">
    <div class="_autoplay-wrapper" @click="handleUnmute" ref="wrapper">
      <div><svg-icon width="20" height="20">
        <volume-medium />
      </svg-icon></div>
      <div>{{ (skin.unmute_text) ? skin.unmute_text : 'Click to unmute' }}</div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es';
import { mapGetters, mapActions } from 'vuex';
import VolumeMedium from '../icons/VolumeMediumIcon.vue';

export default {
    name: 'AutoplayVolume',
    props:['editingInitialStatus'],
    components: {
        VolumeMedium,
    },
    computed: {
        ...mapGetters(['autoplaying', 'skin', 'muted']),
    },
    methods: {
        ...mapActions(['unMuteAutoplay']),
        handleUnmute() {
          // If in edit mode from the app we do nothing when clicked
          if(this.editingInitialStatus) return ;

          this.unMuteAutoplay();
        },
    },
    mounted() {
        anime({
            targets: this.$refs.wrapper,
            scale: 0.8,
            direction: 'alternate',
            loop: true,
            easing: 'linear',
            duration: 1000,
        });
    },
    watch: {
        autoplaying(newVal) {
            if (!newVal) {
                anime.timeline().add({
                    targets: this.$refs.wrapper,
                    opacity: 0,
                    zIndex: '-1',
                    duration: 2000,
                });
            }
        },
    },
};
</script>

<style scoped>
._autoplay-cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
}
._autoplay-wrapper {
    display: flex;
    align-items: center;
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 15px;
    font-size: 11px;
    color: white;
    z-index: 4500;
    opacity: 1;
    padding: 7px 10px;
    cursor: pointer;
}
div:last-of-type {
    margin-left: 5px;
}
</style>