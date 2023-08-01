export default {
  /** Sets the active node and the active video */
  setActiveNode(state, id) {
    const node = state.nodes.items && state.nodes.items[id];
    if (node) {
      state.nodes.active = parseInt(id);
    } else {
      console.error( 'cant set active node for id: ' + id)
    }
  },

  setDynamicParams(state, dynamicParams) {
    state.dynamicParams = dynamicParams;
  },

  setNextNode(state, id){
    state.nodes.next = parseInt(id);
  }
}