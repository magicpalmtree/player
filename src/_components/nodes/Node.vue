<template>
    <div class="node" :data-node-id="node.id" :class="{ 'active' : isActiveNode, 'transition': isTrans }">
        <Interaction
            v-for="interaction in node.interactions"
            :interaction="interaction"
            :key="interaction.id"
        />
    <BackgroundVideo
            v-if="node.media_id && ! media.is_image"
            :media="media"
            :node="node"
        />
        <BackgroundStatic
            v-else
            :media="media"
            :node="node"
        />
        <div
            class="node_overlay"
            @mouseenter="mouseEnter"
            @mouseleave="mouseLeave"
            @click="clicked"
        >&nbsp;</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@lib/EventBus';
import Interaction from './Interaction.vue';
//import handleAction from "@mixins/HandleAction";
import BackgroundVideo from "@components/player/Videos/BackgroundVideo";
import BackgroundStatic from "@components/player/Videos/BackgroundStatic";
import anime from 'animejs/lib/anime.es';

export default {
    name: 'Node',
    props: {
        node: {
            type: Object,
            required: true
        },
    },
    components: {
        Interaction,
        BackgroundVideo, BackgroundStatic
    },
    computed: {
        ...mapGetters(['nodes', 'playing', 'videos', 'activeNodeId', 'nextNodeId']),
        isActiveNode() {
            return this.activeNodeId === this.node.id || this.nextNodeId === this.node.id;
        },
        media(){
          if(! this.node.media_id) return null;

          return this.videos[ this.node.media_id ];
        }
    },
    data() {
        return {
            showInteractionLayer: false,
            isTrans: false
        };
    },
    mixins: [handleAction],
    mounted() {
      // Fired by the video component when the media has completed, we need to check for node end actions before
      // we can transition to the next node
        EventBus.$on('nodeEnded', nodeId => {
            if (nodeId === this.node.id) {
                this.handleNodeCompletion();
            }
        });

        // Fired from the NodeEndWrapper when the timer completes        
        EventBus.$on('endNodeEndDelay', this.endNodeEndDelay);
    },
    methods: {
        clicked() {
            EventBus.$emit('mouseClickNode');
        },
        mouseEnter() {
            EventBus.$emit('mouseEnterNode');
        },
        mouseLeave() {
            EventBus.$emit('mouseLeaveNode');
        },

        handleNodeCompletion() {
            // If we have a delay before fiireing the action we call the start delay func
            if(this.node.completeActionDelay) {
                EventBus.$emit('startNodeEndDelay')
            }
            // If not we can call end delay func straight away as theres no timer
            else {
                this.endNodeEndDelay();
            }
        },

        endNodeEndDelay() {
          // The loop func needs to interact directly with the video so we can't
          // fire this inside the mixin it needs to be done here

          if (this.node.completeAction === 'loop') {
            EventBus.$emit('loopVideo')
          }
          else {

            const animation = this.node.completeAnimation;

            if(this.node.completeAction && this.node.completeActionArg && animation && this.node.completeAction == 'playNode' && this.node.completeActionArg) {
                // Default animation when none set
                this.isTrans = true;
                var animationObj = window.node_animations[animation].anime;
                animationObj = {
                    ...animationObj,
                    duration: 2000
                };
                
                let anim = anime({
                    ...{targets: this.$el}, ...animationObj,
                });

                anim.finished.then(this.handleTransitionComplete);
            }

            this.handleNodeCompleteAction(); // in the handleAction mixin
          }
        },
        handleTransitionComplete() {
            this.isTrans = false;
        }
    },
    watch: {
        isActiveNode(active) {
            // hide IL completely , this resets it on Node change
            if (!active) this.showInteractionLayer = false;
        },
        playing(playing) {
            // if the global playing state changes WHILE showing the IL
            // then hide it until "video end" makes it show up again .
            // ⚡️ We needed this because of the replaying same node or same video on different nodes problem
            // that can be triggered from the IL as well 
            if(playing && this.showInteractionLayer ) this.showInteractionLayer = false;
        }
    }
};
</script>
<style>
.node {
    position: absolute;
    z-index: -1;
    opacity: 0;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.2s ease opacity;
}
.active {
    opacity: 1;
    z-index: 5;
}
.transition{
    opacity: 1;
    z-index: 10;
}
.node_overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
}
.interactions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.2s ease all;
}
.videos {
  width: 100% !important;
  height: 100% !important;
}
</style>
