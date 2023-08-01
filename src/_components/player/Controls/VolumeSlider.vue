<template>
    <div class="_volume">
        <vue-slider
            v-model="value"
            :min="0"
            :max="1"
            :interval="0.01"
            :contained="true"
            :height="3"
            :drag-on-click="true"
            :tooltip="'none'"
            :disabled="muted"
            :processStyle="{
                    background: skin.controls.color
                }"
            :dotStyle="{
                    background: skin.controls.color
                }"
        ></vue-slider>
    </div>
</template>

<script>
import throttle from 'lodash/throttle';
import { EventBus } from '../../../lib/EventBus';
import { mapGetters } from 'vuex';

export default {
    name: 'VolumeSlider',
    data: () => ({
        value: 0.5
    }),
    computed: {
        ...mapGetters(['muted', 'skin'])
    },
    watch: {
        value(newVal) {
            this.changeVolume(newVal);
        }
    },
    methods: {
        changeVolume: throttle(val => {
            EventBus.$emit('setVolume', val);
        }, 200)
    }
};
</script>

<style lang="scss" scoped>
.vue-slider-dot {
    height: 7px !important;
    width: 7px !important;
}
._volume {
    .vue-slider-dot-handle {
        box-shadow: none !important;
    }
    .vue-slider {
        padding-top: 9px !important;
        padding-left: 5px !important;
        padding-right: 10px !important;
    }
}
</style>