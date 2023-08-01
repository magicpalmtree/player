import player from './player';
import video from './video';
import modal from './modal';
import node from './node';
import project from './project';
import { EDITING_STATUSES } from '../../constants';

const getters = {
    dynamicParams: state => state.dynamicParams,
    isMobile: state => state.isMobile,
    userId: state => state.project.user_id,
    editingMode: state => state.editingMode,
    editingStatus: state => state.editingStatus,
    editingInitialStatus: state =>
        state.editingMode && state.editingStatus === EDITING_STATUSES.INITIAL,
    editingPlayingStatus: state =>
        state.editingMode && state.editingStatus === EDITING_STATUSES.PLAYING
};

export default {
    ...getters,
    // ...editing,
    ...player,
    ...video,
    ...modal,
    ...node,
    ...project
};
