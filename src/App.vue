<template>
    <div :style="{height: playerHeight+'px', width: playerWidth+'px', fontSize: '10px', backgroundColor: 'transparent'}" class="relative overflow-hidden">
        <div v-if="fetching" class="flex justify-center h-full items-center">
            <i class="fa-solid fa-spinner-third fa-spin fa-4x" style="color:white; text-align: center;"></i>
        </div>

        <!--  Node end wrapper is here to ensure that the timer overlays any modals    -->
        <!-- <NodeEndWrapper /> -->
        <Player v-else-if="fetched" >
            <Modals />
            <Node v-for="node in nodes" :key="node.id" :node="node" />
        </Player>
        <div v-else>
            {{error }}
        </div>
        <expired-msg v-if="expired" />
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, watch } from 'vue';
import WebFont from 'webfontloader';
import Modals from './components/Modals.vue';
import Node from './components/Node.vue';
import Player from './components/Player.vue';
import ExpiredMsg from './components/ExpiredMsg.vue';
import constants from './constants';
import useAnalytics from './hooks/useAnalytics';
import useConfig from './hooks/useConfig';
import useMedia from './hooks/useMedia';
import useNode from './hooks/useNode';
import usePlayer from './hooks/usePlayer';
import useProject from './hooks/useProject';
import useProjectSize from './hooks/useProjectSize';
import useState from './hooks/useState';
import useNodeApi from './hooks/useNodeApi';
import { notifyParent } from './lib/wrapperUtils';

const { playerWidth, playerHeight, registerResizeHandler, unregisterResizeHandler, handleResize } = useProjectSize();
const { fetched, fetching, error, fetch, project, data } = useProject();
const { nodes, activeNodeId, setActiveNodeId } = useNode();
const { medias, setActiveMediaId, addToCacheList } = useMedia();
const { init: initAnalytics, analytics } = useAnalytics();
const { setAutoplay, inFullScreen, setInFullScreen, expired, minsAllowed, setExpired, setPlaying } = usePlayer();
const { setDynamicParams } = useState();
const { context, previewNodeId } = useConfig();
const { checkUserState } = useNodeApi();
fetch();

watch(fetched, async () => {
    const startNodeId = previewNodeId.value ? previewNodeId.value : project.value.start_node_id;
    
    const startMediaId = nodes.value[startNodeId].media_id;
    initAnalytics(project.value.id);
    
    addToCacheList(startMediaId);
    setActiveNodeId(startNodeId);
    handleResize();
    const scheduler = setInterval(() => {
        if(window.__embeddingId) {
            notifyParent(constants.PLAYER_EVENTS.LOADED);
            clearInterval(scheduler);
        } else {
            fireReadyEvent();
        }
    }, 100);
    

    if(project.value.font) {
        WebFont.load({
            google: {
                families: [project.value.font]
            }
        });
    }
    if(project.value.autoplay)
        setAutoplay(true);
    
    // logic for checking expired
    const userState = await checkUserState(project.value.user_id);
    
    if(!userState && context.value != 'preview') {
        setExpired(true);
    }
});

watch(expired, (newVal) => {
    if(newVal) {
        setPlaying(false);
    }
})

onMounted(() => {
    registerResizeHandler();
    listenForMessageEvents();
    setTimeout(() => {
        fireReadyEvent();
    }, 100);
})

onBeforeUnmount(() => {
    unregisterResizeHandler();
})

const fireReadyEvent = () => {
    notifyParent(constants.PLAYER_EVENTS.READY);
}

const listenForMessageEvents = () => {
    // if(searchParams.has('bigPlayColor')) return searchParams.get('bigPlayColor');
    window.addEventListener('message', (e) => {
        // events fired from devtools etc...
        if(e.origin === document.location.origin){
            return
        }

        const event = JSON.parse(e.data);
        if (event.from == constants.ICTR_WRAPPER) {
            handleWrapperEvents(event);
        }
    });  
}

const handleWrapperEvents = (event) => {
    const {
        name,
        embeddingId,
        fullScreenEnabled,
        dynamicParams,
    } = event;

    if (name == constants.WRAPPER_EVENTS.INIT) {
        window.__embeddingId = embeddingId;
        if (dynamicParams) setDynamicParams(dynamicParams);
    }

    // wrapper told us parent window is currently in full-screen, we use this for updating UI
    if (name == constants.WRAPPER_EVENTS.FS_ENABLED) {
        setInFullScreen(fullScreenEnabled);
    }
}


// import Player from './components/player/Player.vue';
// import { mapActions, mapMutations, mapGetters } from 'vuex';
// import Nodes from './components/nodes/Nodes';
// import { FbPixel } from './lib/FbPixel';
// import Analytics from '@lib/analytics/index';
// import projectSize from './mixins/projectSize';
// import axios from 'axios';
// import { getUrlParameter } from './lib/utils';
// import { notifyParent } from './lib/wrapperUtils';
// import Modals from './components/modals/Modals';
// import CacheManager from './lib/CacheManager';
// import cloneDeep from 'lodash/cloneDeep';
// import NodeEndWrapper from "@components/nodes/NodeEndWrapper";

// import {
//     ICTR_WRAPPER,
//     EDITING_EVENTS,
//     WRAPPER_EVENTS,
//     ICTR_EDITING_PAGE,
//     PLAYER_EVENTS,
// } from '../constants';

// export default {
//     name: 'app',
//     async mounted() {
//         const params = new URLSearchParams(window.location.search);
//         const context = params.get('context');
//         const apiUrl = params.get('apiUrl');
//         const analyticsApiUrl = params.get('analyticsApiUrl');

//         if(apiUrl && analyticsApiUrl) {
//             window.playerConfig.apiUrl = apiUrl;
//             window.playerConfig.analytics.url = analyticsApiUrl;
//         }

//         let response = null;
//         if(context == "preview") {
//             const projectId = params.get('projectid');
//             response = await axios.get(window.playerConfig.apiUrl + '/preview/' + projectId);
//             this.setData(response.data);
//         } else {
//             const hash = params.get('hash');
//             response = await axios.get(window.playerConfig.bunnyCdnUrl + "/" + hash + "/data.json");
//             this.setData(response.data);
//         }

//         var eventMethod = window.addEventListener
//             ? "addEventListener"
//             : "attachEvent";
//         var eventer = window[eventMethod];
//         var messageEvent = eventMethod === "attachEvent"
//             ? "onmessage"
//             : "message";
//         eventer(messageEvent, function (e) {
//             //data you receive from parent is stored inside e.data
//             console.log(e)
//         });

//         this.fireReadyEvent();

//         // Checks for the &editingMode=true param in the URL. This tells the player
//         // to expect update events from the app from the user on the project/player page
//         // const searchParams = new URLSearchParams(window.location.search);
//         // if(searchParams.has('editingMode')) {
//         //   this.listenForMessageEvents();
//         // }

//         this.listenForMessageEvents();

//         if (process.env.NODE_ENV === 'development') {
//             window.useAnalytics = false;
//         }

//         window.analytics = new Analytics(this.project.id);

//         window.fbPixel = new FbPixel(
//             this.project.fbPixelId,
//             this.project.title
//         );
//         console.log('pdq version ---- ', String(process.env.VERSION));
//         // console.log('build ---- ', String(process.env.NODE_ENV))
//         window.ictrCacheManager = new CacheManager({
//             'modals': response.data.modals,
//             'nodes': response.data.nodes,
//             'videos': response.data.videos,
//         });

//         window.ictrCacheManager.cacheNode(this.startingNodeId);

//         window.fbPixel.projectView();
//     },

//     mixins: [projectSize],

//     components: {
//         Player,
//         Nodes,
//         Modals,
//       NodeEndWrapper
//     },

//     computed: {
//         ...mapGetters(['activeVideoId', 'nodes', 'project', 'autoplaying', 'modals', 'videos']),
//         inDevMode() {
//             const params =
//                 URLSearchParams &&
//                 new URLSearchParams(document.location.search);
//             const env = params && params.get('env');
//             return env && ['local1', 'local2'].includes(env);
//         },
//         skipToNode() {
//             return window.location.href.includes('startNodeId')
//                 ? getUrlParameter('startNodeId')
//                 : false;
//         },
//         startingNodeId() {
//             return this.skipToNode
//                 ? this.skipToNode
//                 : this.project.start_node_id;
//         },
//         startNode() {
//             return this.nodes?.[this.startingNodeId];
//         },
//         chapters() {
//             return this.project.chapters ? this.project.chapter_items : false;
//         },
//     },

//     methods: {
//         ...mapActions(['startTransition', 'handleEditingModeStatus']),
//         ...mapMutations([
//             // 'loadVideo',
//             'toggleFullScreenEnabled',
//             'setData',
//             'setDynamicParams',
//             'setEditingMode',
//             'setEditingStatus',
//         ]),

//         fireReadyEvent() {
//             notifyParent(PLAYER_EVENTS.READY);
//         },
//         listenForMessageEvents() {
//           // if(searchParams.has('bigPlayColor')) return searchParams.get('bigPlayColor');

//             window.addEventListener('message', (e) => {
//               // console.log('Received ', e.data);
//                 // events fired from devtools etc...
//                 if(e.origin === document.location.origin){
//                     return
//                 }

//                 const event = JSON.parse(e.data);
//                 if (event.from === ICTR_EDITING_PAGE) {
//                     this.handleEditingEvents(event.name, event.data);

//                     // const debug = {
//                     //   eventFrom: ICTR_EDITING_PAGE,
//                     //   eventName: event.name,
//                     //   eventData: event.data
//                     // }
//                     // console.log('Debug Event Start ========\n');
//                     // console.log(debug);
//                     // console.log('Debug Event End ========\n');
//                 }
//                 if (event.from == ICTR_WRAPPER) {
//                     this.handleWrapperEvents(event);
//                 }
//             });
//         },
//         /** Editing events handler
//          * @param {string} eventName
//          * @param {any} data event value
//          */
//         handleEditingEvents(eventName, data) {
//             switch (eventName) {
//                 case EDITING_EVENTS.SET_EDITING_MODE:
//                     this.setEditingMode(data);
//                     break;
//                 case EDITING_EVENTS.SET_EDITING_STATUS:
//                     this.handleEditingModeStatus(data)
//                     break;
//                 case EDITING_EVENTS.UPDATE_SETTINGS:
//                     this.updateSettings(data);
//                     break;
//                 default:
//                     break;
//             }
//         },
//         updateSettings(data) {
//           if(! this.$store.state.project.autoplay && data.autoplay && ! this.autoplaying ) {
//             this.startTransition(this.$store.state.project.start_node_id )
//           }

//           this.$store.state.project = { ...data };
//         },
//         // TODO clean this up
//         handleWrapperEvents(event) {
//             const {
//                 name,
//                 embeddingId,
//                 fullScreenEnabled,
//                 dynamicParams,
//             } = event;

//             if (name == WRAPPER_EVENTS.INIT) {
//                 window.__embeddingId = embeddingId;
//                 if (dynamicParams) this.setDynamicParams(dynamicParams);
//             }

//             // wrapper told us parent window is currently in full-screen, we use this for updating UI
//             if (name == WRAPPER_EVENTS.FS_ENABLED) {
//                 this.toggleFullScreenEnabled(fullScreenEnabled);
//             }
//         }
//     },
// };
</script>

<style>
.container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
