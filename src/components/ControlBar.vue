<template>
    <!-- <div
        v-if="! forceHideBar"
        ref="controlBar"
        :class="['control-bar', {showing : editingSettingsMode || showControlBar}]"
        :style="{
                background: skin.controls.background,
                color: skin.controls.color
            }"
        @mouseenter="show"
        @mouseleave="hide"
    > -->
    <div :class="['control-bar  px-4 w-full', (! hidden && nextNodeId === 0) ? 'showing' : 'not-showing']"  @mouseleave="hideControlBar"  @mouseover="mouseOver">
        <div
            class="ctls left-ctls rounded-lg justify-center"
            :style="{
                background,
                color,
            }"
        >
            <button class="control-btn ctl-item">
                <i
                    v-if="ended"
                    class="fa-solid fa-rotate-right text-xl"
                    @click="setPlaying(true)"
                ></i>
                <i
                    v-else-if="!playing"
                    class="fa-solid fa-play text-xl"
                    @click="setPlaying(true)"
                ></i>
                <i
                    v-else
                    class="fa-solid fa-pause text-xl"
                    @click="setPlaying(false)"
                ></i>
            </button>
        </div>

        <div
            v-if="!hideTimeline"
            class="ctls center-ctls rounded-lg mx-4 relative flex items-start"
            :style="{
                background,
                color,
            }"
        >
            <Timeline :background="background" :color="color" />
        </div>

        <div
            class="ctls right-ctls rounded-lg px-3 space-x-4"
            :style="{
                background,
                color,
            }"
        >
            <button
                :class="['control-btn  ', 'ctl-item', '']"
            >
                <VolumeControl
                    :background="background"
                    :color="color"
                />
            </button>

            <!-- <button :class="['control-btn', 'ctl-item']">
                <i class="fa-solid fa-gear fa-xl"></i>
            </button> -->

            <button v-if="false" :class="['control-btn', 'ctl-item']">
                <i class="fa-solid fa-closed-captioning fa-xl"></i>
                <!-- <i class="fa-solid fa-closed-captioning-slash"></i> -->
            </button>

            <button 
                v-if="project.allow_share"
                class="control-btn icon setting-btn" 
                @click="toggleShare"
            >
                <i class="fa-solid fa-share-nodes fa-xl"></i>
            </button>

            <button
                v-if="project.chapters"
                class="control-btn icon setting-btn"
                @click="handleChaptersClicked"
            >
                <i class="fa-solid fa-list fa-xl"></i>
            </button>

            <button
                class="control-btn icon setting-btn"
                @click="toggleFullScreen"
            >
                <i v-if="!inFullScreen" class="fa-solid fa-expand fa-xl"></i>
                <i v-else class="fa-solid fa-compress fa-xl"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import useProject from '../hooks/useProject';
import { ref, computed } from 'vue';
import Timeline from './Timeline.vue';
import usePlayer from '../hooks/usePlayer';
import VolumeControl from './VolumeControl.vue';
import Volume from './Volume.vue';
import useControlBar from '../hooks/useControlBar'
import useNode from '../hooks/useNode'
import { notifyParent } from "../lib/wrapperUtils";
import constants from "../constants";

const { project, fetched } = useProject();
const { setPlaying, playing, inFullScreen, ended } = usePlayer();
const { hidden, toggleChapters, toggleShare } = useControlBar();
const { nextNodeId } = useNode();

const background = computed(() => {
    if (!fetched.value) return '';
    return project.value.player_skin.controls.background;
});

const color = computed(() => {
    if (!fetched.value) return '';
    return project.value.player_skin.controls.color;
});

const hideTimeline = computed(() => {
    if (!fetched.value) return false;
    return project.value.player_skin?.hide_timeline != undefined ? project.value.player_skin?.hide_timeline : false;
});

const { showControlBar, hideControlBar} = useControlBar();

const mouseOver = e => {
    showControlBar()    
}

const toggleFullScreen = () => {    
    notifyParent(constants.PLAYER_EVENTS.TOGGLE_FS)
}

const handleChaptersClicked = () => {
    setPlaying(false);
    toggleChapters();
}

// import PlayToggle from '../icons/PlayToggle.vue';
// import Fullscreen from '../icons/Fullscreen.vue';
// import VolumeControl from './VolumeControl.vue';
// // import Quality from '../icons/Quality';
// import Chapters from '../icons/Chapters.vue';
// import { mapGetters, mapMutations, mapActions } from 'vuex';
// import Timeline from './Timeline.vue';
// import Duration from './Duration.vue';
// import Share from '../icons/Share.vue';
// import { EventBus } from '../../../lib/EventBus';
// import { EDITING_STATUSES } from '../../../../constants';

// TODO: Don't show the bar when a modal is active .
// export default {
//     name: 'ControlBar',
//     components: {
//         PlayToggle,
//         Fullscreen,
//         VolumeControl,
//         // Quality,
//         Chapters,
//         Timeline,
//         Duration,
//         Share,
//     },

//     computed: {
//         ...mapGetters([
//             'played',
//             'playing',
//             'chapters',
//             'nextNodeId',
//             'activeNodeId',
//             'project',
//             'skin',
//             'controls',
//             'autoplaying',
//             'editingMode',
//             'editingStatus',
//         ]),
//         // used to always show controlbar while editing except on initial status
//         editingSettingsMode() {
//             return (
//                 this.editingMode &&
//                 this.editingStatus !== EDITING_STATUSES.INITIAL
//             );
//         },
//         timeline() {
//             return this.project.show_controls;
//         },
//         switchingNode() {
//             return this.nextNodeId && this.nextNodeId != this.activeNodeId;
//         },
//     },

//     data: () => ({
//         showControlBar: false,
//         volume_open: false,
//         hideDelay: 1000,
//         hideTimeout: false,
//         forceHideBar: false,
//     }),

//     mounted() {
//         EventBus.$on('showControlBar', () => {
//             this.show();
//         });
//         EventBus.$on('hideControlBar', () => {
//             this.hide();
//         });
//         EventBus.$on('forceHideControlBar', () => {
//             this.forceHide();
//         });
//     },

//     methods: {
//         ...mapMutations(['toggleShare', 'toggleChapters']),
//         ...mapActions(['toggleFullScreen']),

//         togglePlaying() {
//             this.$emit('playToggle');
//         },

//         toggleMute() {
//             this.$emit('muteToggle');
//         },

//         show() {
//             clearTimeout(this.hideTimeout);
//             if (!this.forceHideBar && !this.autoplaying) {
//                 this.showControlBar = true;
//             }
//         },

//         hide() {
//             clearTimeout(this.hideTimeout);
//             this.hideTimeout = setTimeout(() => {
//                 this.showControlBar = false;
//             }, this.hideDelay);
//         },

//         forceHide() {
//             this.forceHideBar = true;
//             this.showControlBar = false;

//             setTimeout(() => {
//                 this.forceHideBar = false;
//             }, 750);
//         },
//     },

//     watch: {
//         playing(_playing) {
//             if (this.played && _playing) this.hide();
//             //if (this.played && !_playing) this.show();
//         },
//         chapters(opened) {
//             if (opened && this.playing) {
//                 // If we're opening chapters and the video is playing pause it
//                 this.$emit('playToggle');
//             }
//             if (
//                 !opened &&
//                 !this.playing &&
//                 this.played &&
//                 !this.switchingNode
//             ) {
//                 // if closing the chapters while not playing and NOT switching the node unpause the video
//                 // it'll play regardless which action u take in chapters otherwise
//                 this.$emit('playToggle');
//             }
//         },
//     },
// };
</script>

<style scoped lang="scss">
.control-bar {
    &.showing {
        opacity: 1;
        transform: translateY(0);
        // z-index: 4000;
    }
    &.not-showing {
        transform: translateY(10%);
        opacity: 0;
    }
    position: absolute;
    bottom: 0em;
    height: 5em;
    padding-bottom:0px;
    z-index: 4000;
    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: transform 0.2s ease-in, all 0.3s ease-out;
}
.ctls {
    height: 100%;
    display: flex;
}
.center-ctls {
    flex: 1;
    height: 3.2em;
}
.right-ctls {
    height: 3.2em;
    align-items: center;
}
// left ctl is play button
.left-ctls {
    width: 4em;
    height: 4em;
    align-items: center;
}

// .control-btn {
//     width: 30px;
//     height: 30px;
//     position: relative;
//     background: transparent;
//     border: none;
//     outline: none;
//     margin-right: 10px;
//     padding: 0;
//     float: left;
//     display: block;
//     font-size: 1.3em;
//     color: inherit !important;
//     cursor: pointer;

//     @media (max-width: 500px) {
//         // margin-right: .3em;
//         font-size: 1.1em;
//     }

//     svg {
//         outline: none;
//     }
// }
.ctl-duration {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 1.1em;
    padding-left: 6px;
    color: inherit;
    line-height: 1;
}
</style>
