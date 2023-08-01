<template>
  <div :style="backgroundColor" class="_wrapper" v-hotkey="keymap">
    &nbsp;
    <img v-if="media" :src="media.thumbnail_url" class="_image" />
  </div>
</template>

<script>
import handlePlayer from "@mixins/handlePlayer";

export default {
  name: "BackgroundColor",
  mixins:[handlePlayer],
  computed:{
    backgroundColor(){
      const background =  (this.node.background_color) ? this.node.background_color  : 'black';

      return {background}
    }
  },

  data:()=>({
    interval: null,
    time: 0
  }),

  mounted(){

  },

  methods:{
    loopVideo(){
      clearInterval(this.interval);
      this.time = 0;
      this.interval = setInterval(this.handleInterval, 250);
      this.handleTimeUpdate(this.time)
      this.play();
    },

    skipTo(){},

    handleInterval(){
      if(this.time <= this.node.duration) {
        // still playing jsut update time
        this.time  = this.time + 0.25;

        this.handleTimeUpdate(this.time);
      }
      else {
        clearInterval(this.interval)
        this.handleEnded();
      }

    }
  },

  watch:{
    active(newVal){
      if(newVal){
        this.updateVideoDuration(this.node.duration);
      }
    },

    playing(newVal){
      if(this.active){
        if(newVal){
          this.interval = setInterval(this.handleInterval, 250);
        }else {
          clearInterval(this.interval);
        }
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
._wrapper {
  height: 100%;
  width: 100%;
}
._image {
  height: 100%;
  width: 100%;
}
</style>