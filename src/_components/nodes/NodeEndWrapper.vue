<template>
<div>
  <NodeEndTimer v-if="showNodeEndTimer" :timer="nodeEndActionDelay" :duration="node.completeActionDelay" />
  <NodeEndSound :play="playNodeEndActionSound" />
</div>
</template>

<script>
import NodeEndTimer from "@components/nodes/NodeEndTimer";
import NodeEndSound from "@components/nodes/NodeEndSound";
import {EventBus} from "@lib/EventBus";

export default {
  name: "NodeEndWrapper",
  components: {NodeEndTimer, NodeEndSound},

  data:()=>({
    // Node End Action Delay Timer
    nodeEndActionDelay: 0,

    playNodeEndActionSound: false,

    showNodeEndTimer: false,

    nodeEndInterval: null,
  }),

  mounted(){
    EventBus.$on('startNodeEndDelay', this.startNodeEndDelay);

    EventBus.$on('togglePlaying', (newVal)=>{
      if(newVal){
        // Trying to play so here we restart any paused timers
        if(this.nodeEndActionDelay > 0 && this.nodeEndInterval) {
          // There's an outstanding delay so we can clear the interval to pause the timer
          clearInterval(this.nodeEndInterval)
          this.nodeEndInterval = null;
          this.playNodeEndActionSound = false;
        }
      }
      else {
        // Trying to pause so if we have an interval timer we need to pause it
        if(this.nodeEndActionDelay) {
          // Trying to play and we still have some node end action time to expire before we fire the action so
          // lets restart the interval
          this.startNodeEndInterval();

          if(this.node.completeActionSound) {
            this.playNodeEndActionSound = true;
          }
        }
      }
    })
  },

  methods:{
    startNodeEndDelay(){
      this.nodeEndActionDelay = this.node.completeActionDelay;

      if(this.node.completeActionSound) {

        this.playNodeEndActionSound = true;
      }

      if(this.node.completeActionTimer) {
        this.showNodeEndTimer = true;
      }

      this.startNodeEndInterval();
    },

    startNodeEndInterval() {
      this.nodeEndInterval = setInterval(()=>{
        console.log(this.nodeEndActionDelay);
        if(this.nodeEndActionDelay > 0) {
          this.nodeEndActionDelay--;
        }
        else {
          // IF we nhave an interval or countdown timer / sound stop them first
          if(this.playNodeEndActionSound) {
            this.playNodeEndActionSound = false;
          }

          if(this.showNodeEndTimer) {
            this.showNodeEndTimer = false;
          }

          this.nodeEndActionDelay =  0;
          
          // Notify the node component we're ready to trigger the action
          EventBus.$emit('endNodeEndDelay')

          clearInterval(this.nodeEndInterval)
        }

      }, 1000);
    },
  }
}
</script>

<style scoped>

</style>