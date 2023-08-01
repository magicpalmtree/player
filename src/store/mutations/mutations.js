import keyBy from 'lodash/keyBy';
// import Node from '../../core/Node'
import player from "./player";
import video from './video';
import modal from './modal';
import node from './node';

const mutations = {
    /** Runs on page loads and pulls the data from the window object and sets it to the store */
    setData(state, data) {
        state.project = data.project;
        state.videos.items = keyBy(data.videos, 'id');
        state.modals.items = keyBy(data.modals, 'id');
        state.nodes.items = keyBy(data.nodes, 'id');
        // state.nodes.items = keyBy(data.nodes.map(n => new Node(n, data.modals)), 'id');
        // state.nodes.active = data.project.start_node_id,
        state.player.autoplaying = data.project.autoplay;
    },
    setEditingMode(state, val){
        state.editingMode = val
    },
    setEditingStatus(state, val){
        state.editingStatus = val
    },
};

export default {...mutations, ...player, ...video, ...modal, ...node};
