import {EventBus} from  '../../lib/EventBus';
import {mapGetters} from "vuex";

export default {
    /**
     * This is the place we transition between nodes so any logic needed to "reset" the player can be handled here
     * setActive node is the start of the transition state between previous and next video setActiveNode
     * */
    startTransition({ commit, getters, dispatch }, nodeId) {
        // console.log('start transition called')
        // ⚡️update time here is for split second bug, interaction show up in incoming node
        commit('pause');
        commit('setBuffering', true);

        try {
            const node = getters.nodes[nodeId];

            if (!node) throw 'Node not found';

            if(! node.media_id) {
                // Static node so we skip straight to the end transition
                dispatch('endTransition', node.id);
                return;
            }

            const video = getters.videos[node.media_id];

            if (!video) throw 'Video not found';

            if(video.is_image) {
                // Static node so we can skip to end transition
                dispatch('endTransition', node.id);
                return;
            }

            // The node BackgroundVideo component will listen for this and when the nextNode is set
            // it will load itself in and fire the end transition event to begin play
            commit('setNextNode', nodeId);

        } catch (err) {
            console.error(err);
        }
    },

    /**
     * This is the end of the transition between the old and new video
     */
    endTransition({ commit, getters }, nodeId) {
        /** Set the node and  Video as Ready and reset state tracked time for interactions to not show while switching video */
        commit('updateCurrentTime', 0)
        commit('setActiveNode', nodeId);

        /* if it's the same video as previous one we're not reloading anything just replaying with skip event, look below 👇 */
        // commit('setVideoReady', nodeId);
        window.ictrCacheManager.cacheNextFromNode(nodeId)

        /** Remove the buffering UI  */
        commit('setBuffering', false);

        // we don't play in editing mode
        if(! getters.editingMode) {
            setTimeout(()=>{
                commit('play');
            }, 500)
        }

        commit('setNextNode', 0);
    }
};
