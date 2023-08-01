<template>
  <div class="_autoplay-cover" @click="handleUnmute" ref="cover">
    <div class="_autoplay-wrapper" ref="wrapper">
      <div>
        <svg-icon width="20" height="20">
          <volume-medium />
        </svg-icon>
      </div>
      <div>{{ (project.player_skin.unmute_text) ? project.player_skin.unmute_text : 'Click to unmute' }}</div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es';
import VolumeMedium from './VolumeMediumIcon.vue';
import useProject from '../hooks/useProject';
import useAction from '../hooks/useAction';
import usePlayer from '../hooks/usePlayer';

export default {
    name: 'AutoplayVolume',    
    setup() {
      const { project } = useProject();
      const { unMuteAutoplay } = useAction();
      const { autoplay } = usePlayer();
      return {        
        autoplay, project, unMuteAutoplay
      }
    },
    components: {
        VolumeMedium,
    },
    methods: {
        handleUnmute() {          
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
      autoplay(newVal) {
        if (!newVal) {
          anime.timeline().add({
            targets: this.$refs.cover,
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