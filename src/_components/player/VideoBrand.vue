<template>
    <transition name="fade">
        <img :src="image" v-if="shouldShow"/>
    </transition>
</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'VideoBrand',
        props:['image'],

        computed: {
            ...mapGetters(['played', 'autoplaying']),
            shouldShow(){
                if(this.played) return true;
                if(this.autoplaying) return true;
                return false;
            }
        }
    }
</script>
<style scoped>
    img {
        position: absolute;
        z-index: 2500;
        top: 10px;
        left: 10px;
        max-width: 12%;
        display: block;
    }
</style>