<template>
    <div class="interaction_layer_wrapper" >
        <div :style="bgWrapperStyles">
            <div ref="background" class="interaction_layer" :style="styles">
            </div>
        </div>
        <div :style="contentWrapperStyles">
            <i
                v-if="closeable"
                name="times"
                class="fa-solid fa-xmark modal-close"
                @click="this.closeModal"
                :style="closeIconStyle"
            />
            <modal-timer
                v-if="useTimer"
                :steps="timerDuration"
                :playSound="playSound"
                @timer-done="handleTimerDone"
            />
            <animated-element
                v-for="element in elements"
                :element="element.element"
                :key="element.id"
            >
                <the-element
                    :element="element.element"
                    :modalElement="element"
                    :type="element.element_type"
                    :key="element.id"
                    :isModalElement="true"
                ></the-element>
            </animated-element>
        </div>
    </div>
</template>
<script>
import theElement from './Element.vue';
import AnimatedElement from './AnimatedElement.vue';
import anime from "animejs";
import useModal from "../hooks/useModal";
import useAction from "../hooks/useAction";
import ModalTimer from "./ModalTimer.vue";

export default {
    name: 'Modal',
    props: ['modal'],
    setup() {
        const { closeModal } = useModal();
        const { handleAction } = useAction();
        return {
            closeModal,
            handleAction
        };
    }, 
    components: {
        theElement, AnimatedElement, ModalTimer
    },

    mounted() {
        this.animateBackground();
    },

    computed: {
        closeIconStyle() {
            return {
                color: this.modal.close_icon_color
            };
        },

        elements() {
            return this.modal.elements;
        },
        useTimer() {
            const animation = this.modal.background_animation;
            return animation && animation != [] ? animation?.use_timer : false;
        },
        timerDuration() {
            const animation = this.modal.background_animation;
            return animation.timer_duration;
        },
        playSound() {
            const animation = this.modal.background_animation;
            return animation.playSound;
        },
        styles() {
            return {
                backgroundColor: this.modal.backgroundColour
                    ? this.modal.backgroundColour
                    : 'white',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: this.modal.border_radius + 'px'
            };
        },
        bgWrapperStyles() {
            let padding = (100 - this.modal.size) / 2 + '%';
            return {
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
                borderRadius: this.modal.border_radius + 'px',
                overflow: 'hidden',
                position: 'absolute'
            };
        },
        contentWrapperStyles() {
            let padding = (100 - this.modal.size) / 2 + '%';
            return {
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
                position: 'absolute'
            };
        },
        closeable() {
            return this.modal.show_close_icon;
        },

        backgroundAnimation() {
            const animation = this.modal.background_animation;
            
            let animationObj = window.background_animations[animation?.name]?.anime;

            return {
                targets: this.$refs.background,
                ...animationObj,
                delay: 1,
                easing: animation?.easing,
                duration: animation?.duration * 1000
            };
        }
    },

    methods: {
        animateBackground() {
            anime.timeline().add(this.backgroundAnimation);
        },
        handleTimerDone() {
            this.handleAction({
                openUrlInNewTab: null,
                action: this.modal.background_animation.endAction,
                actionArg: this.modal.background_animation.endActionArg
            });
        },
    }
};
</script>
<style>
    /*.modal-overlay {*/
    /*    background-color: rgba(0, 0, 0, 0.6);*/
    /*    position: absolute;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    right: 0;*/
    /*    bottom: 0;*/
    /*    z-index: 3100;*/
    /*}*/
    
    /*.modal {*/
    /*    position: absolute;*/
    /*    !*top: 20px;*!*/
    /*    !*left: 20px;*!*/
    /*    !*right: 20px;*!*/
    /*    !*bottom: 20px;*!*/
    /*    !*border-radius: 5px;*!*/
    /*    height: auto;*/
    /*    width: auto;*/
    /*}*/
    .modal-close {
        position: absolute;
        right: 15px;
        top: 15px;
        color: #113348;
        font-size: 18px;
        cursor: pointer;
        z-index: 501;
    }
    
    .interaction_layer {
        position: absolute;
        overflow: hidden;
        /* top: 0;
        left: 0;
        height: 100%;
        width: 100%; */
    }
    
    .interaction_layer_wrapper {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 3000;
        backface-visibility: hidden;
        will-change: transform, opacity, contents, scroll-position;
    }
</style>
  