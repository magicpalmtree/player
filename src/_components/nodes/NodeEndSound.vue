<template>
  <audio
      ref="player"
      src="https://a-fast.b-cdn.net/shared/timer.mp3"
      style="position: absolute;left: -99999px;top:-99999px"
      loop
  ></audio>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NodeEndSound",
  props:{
    play: {
      default: false
    }
  },

  mounted () {
    this.audioPlayer = this.$refs.player;
  },

  data: ()=>({
    audioPlayer: null
  }),

  computed: {
    ...mapGetters([
      'muted',
    ]),
  },
  watch:{
    muted(val){
      this.audioPlayer.muted = val;
    },
    play(val) {
      if(val) {
        this.audioPlayer.play()
      }else {
        this.audioPlayer.pause();
      }
    }
  }
}
</script>

<style scoped>

</style>