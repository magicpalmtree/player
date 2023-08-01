<template>
    <div class="player-wrapper" style="height: 100%;width:100%;">
        
        <cant-play-msg v-if="cantPlay" />
        
        <!-- Z Index 4500 -->
        <autoplay-volume v-if="showAutoplayVolume"  :editingInitialStatus="editingInitialStatus"/>

        <!-- Z Index 4500 -->
        <cover
            v-if="showTheCover"
            :played="played"
            :allow-click="!editingInitialStatus"
            @click="firstPlay"
            class="cover"
        />

        <!-- Z Index 4200 -->
        <!-- <slot name="modals" /> -->

        <!-- Z Index 4100 -->
        <Chapters v-if="project.chapters" />

        

        <!-- Z Index 4000 -->
        <ShareIcons v-if="project.allow_share" />

        <!-- Z Index 2500 -->
        <video-brand v-if="project.branding_image_src" :image="project.branding_image_src"></video-brand>

        <!-- Z Index 2000 (Node goes here )-->
        <slot />
    </div>
</template>

<script>
import ControlBar from './Controls/ControlBar.vue';
import Loader from '../../components./../components/Loader.vue';
import Cover from './Cover.vue';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import ShareIcons from './SocialShare/ShareIcons.vue';
import { EventBus } from '../../lib/EventBus';
import Chapters from './Chapters/Chapters.vue';
import AutoplayVolume from './AutoplayVolume.vue';
import VideoBrand from './VideoBrand.vue';
import Thumbnail from './Thumbnail.vue';
import CantPlayMsg from './CantPlayMsg.vue';
import { EDITING_STATUSES } from '../../../constants';

export default {
    name: 'Player',
    components: {
        CantPlayMsg,
        Cover,
        ControlBar,
        Loader,
        ShareIcons,
        Chapters,
        AutoplayVolume,
        VideoBrand
        // Thumbnail
    },
    data: () => ({
        player: {},
        ready: false,
        hasLeftPlayArea: false // Used to stop the control bar showing when the video is first played
    }),

    props: {
        startNodeId: Number
    },

    mounted() {
        /** These methods are needed so we don't have to duplicate any of the code in other components */
        //EventBus.$on('mouseEnterNode', this.showControlBar);
        EventBus.$on('mouseLeaveNode', this.hideControlBar);
        EventBus.$on('mouseClickNode', this.playToggle);
        EventBus.$on('playToggle', this.playToggle);

        /** Toggle play on space bar press */
        document.body.onkeyup = e => {
            if (e.key == "space") {
                if (!this.played) {
                    this.firstPlay();
                } else this.playToggle();
            }
        };

        if(this.project.autoplay){
            this.startTransition(this.startNodeId )
        }
    },

    computed: {
        ...mapGetters([
            'cantPlay',
            'playing',
            'muted',
            'played',
            'nodes',
            'project',
            'controls',
            'buffering',
            'autoplaying',
            'editingMode',
            'editingStatus',
            'editingInitialStatus',
            'activeNodeId'
        ]),

        thumbnail() {
            return this.project.image_url;
        },

        shareData() {
            return this.project.share_data;
        },
        showTheCover(){
            if(this.inInitialStatusEditing && !this.project.autoplay) return true
            else if(! this.project.autoplay && !this.playing && !this.played) return true
            else return false
        },
        showAutoplayVolume(){
            if(this.inInitialStatusEditing && this.project.autoplay) return true
            return this.project.autoplay && this.ready && this.autoplaying
        }
    },

    methods: {
        ...mapMutations([
            'updatePlayStatus',
            'updateMutedStatus',
            'updateVideoDuration',
            'play',
            'pause',
            'updatePlayed',
            'updateVolume',
            'updateAutoplaying',
        ]),

        ...mapActions(['unMuteAutoplay', 'startTransition']),

        muteToggle() {
            this.updateMutedStatus(!this.muted);
        },

        playToggle() {
            // don't do anything if buffering
            // if(this.buffering) return ;
            // if (this.autoplaying) {
            //     this.unMuteAutoplay();
            // } else
              if (this.playing) {
                EventBus.$emit('showControlBar');
                this.pause();
            } else {
                this.play();
            }
        },

        firstPlay() {
            this.startTransition(this.startNodeId)
            //this.play();
            this.updatePlayed(true);
        },

        showControlBar() {
            if (this.hasLeftPlayArea) {
                EventBus.$emit('showControlBar');
            }
        },

        hideControlBar() {
            this.hasLeftPlayArea = true;
            EventBus.$emit('hideControlBar');
        }
    },

    watch: {
        activeNodeId(val){
          // As soon as active node id is set for the first time we can set the player to ready
          if(val){
            this.ready = true;
          }
        },
        played(_played){
            if(_played) window.analytics.view()
        }
    }
};
</script>

<style scoped>
.player-wrapper {
    position: relative;
    overflow: hidden;
    /*margin-top: 150px;*/
    /*background: none;*/
}
</style>