<template>
    <div data-name="interaction-wrapper" :style="position" class="element-wrapper" >
        <!-- <component :is="component" :data-name="type + '-element'" :element="element" /> -->
        <hotspot-element
            v-if="type === 'App\\HotspotElement'"
            :element="element"
            :interaction="interaction"
            :isModalElement="isModalElement"
            :modalElement="modalElement"
        ></hotspot-element>
        <button-element
            v-if="type === 'App\\ButtonElement'"
            :element="element"
            :interaction="interaction"
            :isModalElement="isModalElement"
            :modalElement="modalElement"
        ></button-element>
        <text-element
            v-if="type === 'App\\TextElement'"
            :element="element"
            :interaction="interaction"
            :isModalElement="isModalElement"
            :modalElement="modalElement"
        ></text-element>
        <form-element
            v-if="type === 'App\\FormElement'"
            :element="element"
            :interaction="interaction"
            :isModalElement="isModalElement"
            :modalElement="modalElement"
        ></form-element>
        <html-element
            v-if="type === 'App\\CustomHtmlElement'"
            :element="element"
            :interaction="interaction"
            :isModalElement="isModalElement"
            :modalElement="modalElement"
        ></html-element>
        <image-element
            v-if="type === 'App\\ImageElement'"
            :element="element"
            :interaction="interaction"
            :isModalElement="isModalElement"
            :modalElement="modalElement"
        ></image-element>
    </div>
</template>
<script>
    import hotspotElement from './Hotspot.vue';
    import buttonElement from './Button.vue';
    import TextElement from './Text.vue';
    import FormElement from './Form.vue';
    import HtmlElement from './Html.vue';
    import ImageElement from './Image.vue';
    import useProjectsize from "../hooks/useProjectSize";
    import useAction from '../hooks/useAction';
    import useNode from '../hooks/useNode';
    import useMedia from '../hooks/useMedia';
    import anime from 'animejs'

    export default {
        name:'Element',
        setup() {
            const { scaleValue, scaledStyles } = useProjectsize();
            const { elementView, modalElementView } = useAction();
            const { nodes } = useNode();
            const { addToCacheList } = useMedia();

            return {
                scaleValue,
                scaledStyles,
                elementView,
                modalElementView,
                nodes,
                addToCacheList
            }
        },
        props: ['element', 'type', 'interaction', 'modalElement', 'isModalElement'],
        components: {
            hotspotElement, buttonElement, TextElement, FormElement, HtmlElement, ImageElement
        },
        mounted(){  
            if(this.isModalElement) {
                this.modalElementView(this.modalElement);
                if (this.element.action === 'playNode' && this.element.actionArg > 0) {
                    this.addToCacheList(this.nodes[this.element.actionArg].media_id);
                }
            }else {
                this.elementView(this.interaction);
            }
            anime
                .timeline()
                .add({
                  ...{targets: this.$el}, ...this.animation
                })
        },

        computed: {
            animation(){
                const animation = this.element.animation;
                var animationObj;
                
                if(! animation) {
                    // Default animation when none set
                    animationObj = window.element_animations.FadeIn.anime;
                    return {
                        ...animationObj,
                        easing: 'easeInExpo',
                        duration: 1000
                    }
                }
                
                animationObj = window.element_animations[animation.name].anime;

                return {
                    ...animationObj,
                    delay: ( animation.delay) ? animation.delay * 1000 : 0,
                    easing: animation.easing,
                    duration: (animation.duration * 1000)
                }
            },
            position(){
                const elementStyle = {
                    // ...this.scaledStyles,
                    position:'absolute',
                    willChange: 'transform,opacity,contents',
                    left: 0,
                    top: 0,
                    height:   this.height,
                    width:  this.width,
                    zIndex: this.element.zIndex + 200 ,
                    pointerEvents: 'auto' // 🔥 pretty important for elements to actually click
                }
                return elementStyle
            },

            leftPosition() {
                return this.scaleValue(this.element.posX) + 'px';
            },

            topPosition() {
                return this.scaleValue(this.element.posY) + 'px';
            },

            height() {
                return this.element.height + 'px';
            },

            width() {
                return this.element.width + 'px';
            }
        }
    };
</script>
<style>
    /* ⚡️ This is used in the individual elements components just placed it here to avoid repetiton 🔥 */
    .centeredElement{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .clickable {
        cursor: pointer;
    }
</style>