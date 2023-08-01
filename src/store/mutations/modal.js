export default {
  setActiveModal(state, id) {
    state.modals.active = parseInt(id);
  },
  closeModal(state) {
    state.modals.active = false;
    state.player.playing = true;
  },
}