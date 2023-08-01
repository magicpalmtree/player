<template>
    <transition name="fade">
        <img :src="image" v-if="shouldShow"/>
    </transition>
</template>
<script>
    import usePlayer from '../hooks/usePlayer';
    export default {
        name: 'VideoBrand',
        props:['image'],
        setup() {
            const { played, autoplay } = usePlayer();
            return { played, autoplay };
        },
        computed: {
            shouldShow(){
                if(this.played) return true;
                if(this.autoplay) return true;
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
        max-width: 10%;
        display: block;
    }
</style>