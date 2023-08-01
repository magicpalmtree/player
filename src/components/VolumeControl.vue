<template>
    <div class="volume-wrapper relative">
        <Volume  @mouseover="handleMouseOver" @click="handleClick" />
        <div :class="['volume-slider rounded-lg', {show: volumeControlOpen}]" :style="{
                background, color
            }">
            <vue-slider
                v-model="volume"
                :min="0"
                :max="1"
                :interval="0.01"
                :contained="true"
                :height="100"
                :direction="'btt'"
                :width="6"
                :drag-on-click="true"
                :tooltip="'none'"
                :disabled="muted"
                :processStyle="{
                    background: props.color 
                }"   
                :railStyle="{
                    background: props.color 
                }"
                :dotStyle="{
                    background: props.color
                }"
            ></vue-slider>
        </div>
    </div>
</template>

<script setup>
import throttle from 'lodash/throttle';
import Volume from './Volume.vue'
import usePlayer from '../hooks/usePlayer'
import VueSlider from 'vue-slider-component'
import {ref} from 'vue'

const props = defineProps({
    background:{},
    color: {}
})

const {volume, setMuted, muted, volumeControlOpen, setVolumeControlOpen} = usePlayer();

const handleMouseOver = () => {
    if(muted.value) return;    
    setVolumeControlOpen(true);
}

const handleClick = () => {
    if(muted.value) {
        setVolumeControlOpen(true);
    } else {
        setVolumeControlOpen(false);
    }
    setMuted(!muted.value);
}

</script>

<style lang="scss" scoped>
.volume-slider {
    /* float: left; */
    overflow: hidden;
    width: 30px;
    padding-left: 5px;
    transition: 0.1s linear opacity;
    background: inherit;
    position: absolute;
    bottom: 175%;
    left: -7px;
    pointer-events: none;
    padding-top: 5px;
    padding-bottom: 5px;
    opacity: 0; 
    z-index: -1; 
    transition: opacity  .3s ease-out, z-index .4s ease ;

    &.show {
        pointer-events: initial;
        opacity : 1;
        z-index: 10;
    }
}
</style>
<style>

.vue-slider-dot {
    height: 10px !important;
    width: 10px !important;
}
</style>