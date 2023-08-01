<template>
    <span @click="handleClick" v-html="element.html"></span>
</template>
<script>
    import useAction from '../hooks/useAction';

    export default {
        name:'Hotspot',
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
            handleClick() {
                if(this.isModalElement) {
                    this.modalElementClick(this.modalElement)
                } else {
                    this.elementClick(this.element, this.interaction);
                }
            }
        },
    }
</script>
<style scoped>
    span {
        display: block;
        cursor: pointer;
        height:100%;
        width: 100%;
    }
</style>