<template>
    <div class="timeline-container px-4 w-full pt-[1.2em]"  ref="container">
        <vue-slider
            v-model="value"
            :min="0.00"
            :interval="0.01"
            :max="max"
            :railStyle="{
                background: props.background,
                height: '0.8em',
                borderRadius: '0.2rem',
            }"
            :processStyle="{
                background: props.color,
                height: '0.8em',
                borderRadius: '0.2rem',
            }"
            :dotStyle="{
                background: props.color,
                borderColor: props.color,
                height: '1.1em', 
                width: '1.1em', 
                marginTop: '-0.4px'
            }"
            @change="setSkipToTime"
            :tooltip-formatter="formatTooltip(value)"
        ></vue-slider>
    </div>
</template>

<script setup>
import { ref, computed} from 'vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import usePlayer from '../hooks/usePlayer'

const {duration, currentTime, setSkipToTime} = usePlayer();

const props = defineProps({
    background: {},
    color:{}
})

const max = computed(()=>{
    return parseInt(duration.value);
});

const value = computed({
    get(){        
        return currentTime.value;
    },
    set(newValue){}
});

const formatTooltip = (seconds) => {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
}

    // import {mapGetters, mapMutations} from 'vuex';
    // import {EventBus} from '../../../lib/EventBus';
    // export default {
    //     name: "Timeline",
    //     computed:{
    //         ...mapGetters([
    //             'videoDuration', 'currentTime', 'activeVideoId', 'skin'
    //         ]),

    //         videoTime: {
    //             set(time) {
    //                 this.updateCurrentTime(time)
    //             },
    //             get(){
    //                 return this.currentTime < this.videoDuration ? this.currentTime : this.videoDuration
    //             }
    //         },
            
    //         progress(){
    //             return (this.videoTime / this.videoDuration ) * 100;
    //         },
    //     },
    //     data:()=>({
    //         skipping:false
    //     }),
    //     methods:{

    //         ...mapMutations(['updateCurrentTime']),
    //         playerSeek(val){
    //             // this.$emit('goToTime', val);
    //             EventBus.$emit('skipTo', val);
    //         },
    //         goToTime(e){

    //             // This removes the css class that controls the transition so when skipping the video
    //             // the timeline doesn't slowly transition between current times.
    //             // this.skipping = true;
    //             // setTimeout(()=>{
    //             //     this.skipping = false
    //             // }, 500);

    //             const clickedPosition = e.x;
    //             const rect = this.$refs.container.getBoundingClientRect();
    //             const percent = ( clickedPosition / rect.width ) * 100;
    //             const newTime = ( this.videoDuration / 100 ) * percent;
    //             // this.$emit('goToTime', newTime);
    //              EventBus.$emit('skipTo', newTime);
    //         },
    //     },

    //     watch:{
    //         activeVideoId(){
    //             // when this changes disable the timeline transition so it doesn't slowly move
    //             // back to the start
    //             this.skipping = true;
    //             setTimeout(()=>{
    //                 this.skipping = false
    //             },1000);
    //         }
    //     }
    // }
</script>

<style  lang="scss">
    .timeline-buffered {

    }
    .timeline-container {
        /*background: rgba(0, 0, 0, 0.4);*/
        // position: absolute;
        // top: 0;
        // left: 0;
        // width: 100%;
        //  z-index: 5;
        // cursor:pointer;
        // height: 5px;

        .vue-slider {
            padding: 0 !important;
        }
    }
    .timeline-indicator {

    }
    /*.timeline-played {*/
    /*    position: absolute;*/
    /*    bottom: 0;*/
    /*    left: 0px;*/
    /*    height: 5px;*/
    /*}*/
    .transitioning {
        transition: 1s linear all;
    }
</style>