<template>
  <div class="_wrapper" :style="{
         willChange: 'transform,opacity',
    }">
      <radial-progress-bar
          :diameter="60"
          :completed-steps="timer"
          :total-steps="duration"
          startColor="#fff"
          stopColor="#fff"
          :strokeWidth="3"
      >
        <h4>{{timer}}</h4>
      </radial-progress-bar>
    </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress';

export default {
  name: "NodeEndTimer",
  components: {
    RadialProgressBar
  },

  props:{
    timer: {
      type: Number,
      required: true,
      description: 'The current time of the timer'
    },
    duration:{
      type: Number,
      required: true,
      description: 'The total duration of the timer'
    }
  }
}
</script>

<style scoped>
h4 {
  color: white;
  margin: 0;
  text-align: center;
}
._wrapper {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px;
  opacity: 1;
  z-index: 9999;
  height: 70px;
  width: 70px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
</style>