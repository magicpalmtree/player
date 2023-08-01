<template>
    <div class="_wrapper" :style="{
         willChange: 'transform,opacity',
    }">
        <radial-progress-bar
            :diameter="60"
            :completed-steps="completedSteps"
            :total-steps="steps"
            startColor="#fff"
            stopColor="#fff"
            :strokeWidth="3"
        >
            <h4>{{timer}}</h4>
        </radial-progress-bar>
        <audio
            v-if="playSound && timer > 0 && startSound"
            src="https://vsplayer.global.ssl.fastly.net/assets/timer.mp3"
            style="position: absolute;left: -99999px;top:-99999px"
            loop
            autoplay
        ></audio>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es'
import RadialProgressBar from 'vue-radial-progress';
import { EventBus } from '@lib/EventBus';

export default {
    name: 'InteractionLayerTimer',
    components: {
        RadialProgressBar
    },
    props: {
        steps: {},
        playSound: {}
    },
    mounted() {
        EventBus.$on('click', () => {
            this.startSound = false;
        });

        this.timer = this.steps;

        setTimeout(() => {
            const interval = setInterval(() => {
                if (this.completedSteps < this.steps) {
                    this.completedSteps++;
                    this.timer--;
                } else {
                    clearInterval(interval);
                    this.$emit('timer-done')
                }
            }, 1000);
            this.startSound = true;
        }, 2000);

        anime.timeline().add({
            targets: this.$el,
            opacity: [0, 1],
            duration: 2000,
            delay: 2000
        });
    },
    data: () => ({
        completedSteps: 0,
        timer: 0,
        startSound: false
    })
};
</script>

<style scoped>
h4 {
    color: white;
    margin: 0;
    text-align: center;
}
._wrapper {
    width: auto;
    position: absolute;
    top: 10px;
    left: 10px;
    opacity: 0;
    z-index: 9999;
}
</style>