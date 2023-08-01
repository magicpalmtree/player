<template>
    <div data-name="interaction-layer-element-wrapper" :style="style">
        <slot />
    </div>
</template>

<script>
    import useProjectSize from "../hooks/useProjectSize";

    export default {
        name: "AnimatedElement",
        setup() {
            const { scale, scaleValue, scaledStyles } = useProjectSize();
            return {
                scale,
                scaledStyles,
                scaleValue
            };
        },
        props:{
            element:{},
        },
        computed:{
            style() {
                return {
                    ...this.scaledStyles,
                    position: 'absolute',
                    // opacity: 0,
                    left: this.leftPosition,
                    top: this.topPosition,
                    height: this.height,
                    width: this.width,
                    willChange: 'transform, opacity',
                    zIndex: this.element.zIndex + 200, // Bump up the zindex's so they appear above the video
                    pointerEvents: 'none', // don't forget to cancel this in child so elemnts under can be clicked
                }
            },

            leftPosition(){                
                return this.scaleValue(this.element.posX) + 'px';
            },

            topPosition(){
                return this.scaleValue(this.element.posY) + 'px';
            },

            height(){
                return this.element.height + 'px';
            },

            width(){
                return this.element.width + 'px';
            }
        },
        watch:{
            show(){
            }
        }
    }
</script>

<style scoped>

</style>