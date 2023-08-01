<template>
    <div class="cover" data-testId="thumbnail">
        <div class="big-play-btn"  >
            <big-play-icon data-testId="playButton" role="button" name="play-button" @click="clicked" />
        </div>
        <Thumbnail class="cover-thumb" />
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es'
import BigPlayIcon from './icons/BigPlay.vue';
import Thumbnail from './Thumbnail.vue';

export default {
    name: 'Cover',
    components: {
        BigPlayIcon,
        Thumbnail
    },
    props: { allowClick: Boolean, ready: Boolean, played: Boolean },
    methods: {
        clicked() {
            if(this.allowClick) {
              const targets = this.$el;
              anime.timeline().add({
                targets,
                scale: 2,
                duration: 1000,
                opacity: 0,
                zIndex: '-1',
                easing: 'easeOutExpo'
              });

              // Delay the click event until the animation has played
              setTimeout(()=>{
                this.$emit('click');
              }, 700)
            }
        }
    },
};
</script>

<style scoped>
.cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    z-index: 4500;
}

.cover:hover .cover-thumb {
    /*transform: scale(1.02);*/
}
.cover-thumb {
    /*transform: scale(1);*/
    /*transform-origin: top right;*/
    /*transition: transform 0.3s ease-in;*/
    /*z-index: 1;*/
}
.big-play-btn {
    z-index: 2;
    cursor: pointer;
}
</style>T