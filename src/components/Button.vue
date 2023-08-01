<template>
    <div :style="inlineStyles" @click="handleClick" class="centeredElement" :class="{'clickable': element.action}" v-if="! hide">
        <span v-html="element.html" class="chrome-scale-fix" style="text-align: center"></span>
    </div>
</template>
<script>
    import useAction from '../hooks/useAction';
    import useProject from '../hooks/useProject';

    export default {
        name:'Button',
        setup(){
            const { elementClick, modalElementClick } = useAction();
            const { project } = useProject();
            return { elementClick, modalElementClick, project };
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
        data(){
            return {
                // Sometimes we may want to hide an element after it's clicked (Like with the skip to time action)
                hide: false
            }
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

        mounted(){},

        computed:{
            inlineStyles(){
                return {
                    width: '100%',
                    height: '100%',
                    background: this.element.background,
                    borderRadius: this.element.borderRadius + 'px',
                    letterSpacing: this.element.letterSpacing + 'px',
                    borderStyle: this.element.borderType,
                    borderColor: this.element.borderColor,
                    borderWidth: this.element.borderWidth + 'px',
                    fontFamily: this.project.font,
                    cursor: 'pointer'
                }
            }
        },
    }
</script>
<style>
    p {
        margin: 0;
    }
</style>
<style scoped>
    div {
        position: relative;
        overflow: hidden;
    }
    .clickable:hover:before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: '';
        background: rgba(0, 0, 0, 0.1);
    }
</style>