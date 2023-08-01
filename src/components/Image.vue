<template>
    <img :style="inlineStyles" @click="handleClick" :src="this.element.src"/>
</template>
<script>    
    import useAction from '../hooks/useAction';

    export default {
        name:'ImageElement',
        setup(){
            const { elementClick, modalElementClick } = useAction();
            return { elementClick, modalElementClick };
        },
        props:{
            element:{
                required: true,
                type: Object
            },
          interaction: {},
          isModalElement: {},
          modalElement: {}
        },
        methods:{
            handleClick(){
                if(this.isModalElement) {
                    this.modalElementClick(this.modalElement)
                } else {
                    this.elementClick(this.element, this.interaction);
                }
            }
        },
        computed:{
            inlineStyles() {
                return {
                    width: '100%',
                    height: '100%',
                    opacity: this.isModalElement ? this.modalElement.element.opacity : this.element?.opacity
                }
            }
        },
    }
</script>
<style scoped>
    img {
        cursor: pointer;
    }
</style>
