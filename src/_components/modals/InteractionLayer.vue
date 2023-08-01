<template>
    <div class="interaction_layer_wrapper">
        <div
            ref="background"
            class="interaction_layer"
            :style="{
                backgroundColor: modal.backgroundColour
            }"
        >&nbsp;</div>
        <interaction-layer-timer
            v-if="useTimer"
            :steps="timerDuration"
            :playSound="playSound"
            @timer-done="handleTimerDone"
        />
        <div :style="{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }">
            <interaction-layer-element
                v-for="element in modal.elements"
                :key="element.id"
                :element="element.element"
                :delay="modal.background_animation.duration"
            >
                <the-element
                    :element="element.element"
                    :type="element.element_type"
                    :interactionLayerElement="true"
                />
            </interaction-layer-element>
        </div>
    </div>
</template>
<script>
import anime from 'animejs/lib/anime.es'
import { EventBus } from '../../lib/EventBus';
import { mapGetters, mapMutations } from 'vuex';
import find from 'lodash/find';
import theElement from '../elements/Element.vue';
import InteractionLayerTimer from './InteractionLayerTimer.vue';
import forEach from 'lodash/forEach';

export default {
    name: 'InteractionLayer',
    props: {
        node: {}
    },
    data: () => ({
        show: false
    }),
    components: {
        theElement,

        InteractionLayerTimer
    },
    mounted() {
        this.animateBackground();
    },
    computed: {
        ...mapGetters(['modals', 'nodes']),
        modal() {
            const interaction = find(this.node.interactions, {
                id: this.node.interaction_layer_id
            });
            return this.modals[parseInt(interaction.element.actionArg)];
        },
        useTimer() {
            const animation = this.modal.background_animation;
            return animation.use_timer;
        },
        timerDuration() {
            const animation = this.modal.background_animation;
            return animation.timer_duration;
        },
        playSound() {
            const animation = this.modal.background_animation;
            return animation.playSound;
        },
        backgroundAnimation() {
            const animation = this.modal.background_animation;
            let animationObj =
                window.background_animations[animation.name].anime;

            return {
                targets: this.$refs.background,
                ...animationObj,
                delay: 1,
                easing: animation.easing,
                duration: animation.duration * 1000
            };
        }
    },
    methods: {
        handleTimerDone() {
            EventBus.$emit('INTERACTION_LAYER_TIMER_DONE', this.node.id);
            this.show = false;
        },
        animateBackground() {
            anime.timeline().add(this.backgroundAnimation);
        }
    }
};
</script>


<style scoped>
.interaction_layer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.interaction_layer_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 500;
    backface-visibility: hidden;
    will-change: transform, opacity, contents, scroll-position;
}
</style>