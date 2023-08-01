import transition from "./transition";
import { notifyParent } from "../../lib/wrapperUtils";
import { EDITING_STATUSES, PLAYER_EVENTS  } from "../../constants";
// import { lockScreenInLandscape } from "../../lib/playThroughUtils";
// import fscreen from "fscreen";
const actions = {
    toggleFullScreen(){
        notifyParent(PLAYER_EVENTS.TOGGLE_FS)
    },
    unMuteAutoplay({commit}){
        commit('updateMutedStatus', false);
        commit('updatePlayed', true);
        commit('updateAutoplaying');
        commit('play');
    },
    handleEditingModeStatus({dispatch}, status){
        switch (status) {
            case EDITING_STATUSES.INITIAL:
                dispatch('getIntoEditingInitialStatus')
                break;
            case EDITING_STATUSES.PLAYING:
                dispatch('getIntoEditingPlayingStatus')
                break;
            case EDITING_STATUSES.CHAPTERS:
                dispatch('getIntoEditingChaptersStatus')
                break;
            case EDITING_STATUSES.SHARING:
                dispatch('getIntoEditingSharingStatus')
                break;
            default:
                break;
        }
    },
    getIntoEditingInitialStatus({commit}){
        commit('setEditingStatus', EDITING_STATUSES.INITIAL)
        commit('pause')
        commit('updateCurrentTime', 0)
        commit('updatePlayed', false)
    },
    getIntoEditingPlayingStatus({dispatch, commit, getters}){
        // stupidest code ever , this app really needs some architectin'
        dispatch('startTransition', getters.project.start_node_id)
        commit('updateCurrentTime', 3)
        commit('setEditingStatus', EDITING_STATUSES.PLAYING)
        commit('updatePlayed', true)
        commit('toggleChapters', false)
        commit('toggleShare', false)
        commit('pause')
    },
    getIntoEditingChaptersStatus({dispatch, commit}){
        dispatch('getIntoEditingPlayingStatus')
        commit('setEditingStatus', EDITING_STATUSES.CHAPTERS)
        commit('toggleChapters', true)
    },
    getIntoEditingSharingStatus({dispatch, commit}){
        dispatch('getIntoEditingPlayingStatus')
        commit('setEditingStatus', EDITING_STATUSES.SHARING)
        commit('toggleShare', true)
    }
};

export default {...actions, ...transition};