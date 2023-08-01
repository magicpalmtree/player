<template>
  <div class="interaction_layer_wrapper" >
        <div
              ref="background"
              class="interaction_layer"
              :style="{
                backgroundColor: modal.backgroundColour
            }"
          >&nbsp;</div>

<!--            <div class="modal" :style="styles">-->
                <icon
                    v-if="closeable"
                    name="times"
                    class="modal-close"
                    @click="this.closeModal"
                    :style="closeIconStyle"
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
<!--            </div>-->
        </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import theElement from '../elements/Element.vue';
import AnimatedElement from "@components/elements/AnimatedElement";
import anime from "animejs";

export default {
    name: 'Modal',
    props: ['modal'],
    components: {
        theElement, AnimatedElement
    },

    mounted() {
      this.animateBackground();
    },

    computed: {
        ...mapGetters(['activeModalId', 'nodes']),

        closeIconStyle() {
            return {
                color: this.modal.close_icon_color
            };
        },

        elements() {
            return this.modal.elements;
        },

        showModal() {
            return this.modal.id === this.activeModalId;
        },

        styles() {
            let padding = (100 - this.modal.size) / 2 + '%';

            return {
                backgroundColor: this.modal.backgroundColour
                    ? this.modal.backgroundColour
                    : 'white',
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
                borderRadius: this.modal.border_radius + 'px'
            };
        },

        closeable() {
            return this.modal.show_close_icon;
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
        ...mapMutations(['closeModal', 'loadVideo']),
        loadDestinationNodesFromElements() {
            //     this.elements.forEach(el => {
            //         if (
            //             el.element &&
            //             el.element.action === 'playNode' &&
            //             el.element.actionArg
            //         ) {
            //             const node = this.nodes[el.element.actionArg.toString()];
            //             if (node) this.loadVideo(node.media_id);
            //         }
            //     });
        },

      animateBackground() {
        anime.timeline().add(this.backgroundAnimation);
      }
    },

    watch:{
      showModal(val){
        if(val){
          window.analytics.modalView(this.modal);
        }
      }
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
    right: 10px;
    top: 10px;
    color: #113348;
    font-size: 16px;
    cursor: pointer;
    z-index: 501;
}

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
  z-index: 5000;
  backface-visibility: hidden;
  will-change: transform, opacity, contents, scroll-position;
}
</style>
