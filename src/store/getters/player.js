
export default {
  playing: state => state.player.playing,
  muted: state => state.player.muted,
  volume: state => state.player.volume,
  inFullScreen : state => state.player.inFullScreen,
  videoDuration(state){
    return (state.player.duration) || false;
  },
  currentTime(state){
    return (state.player.currentTime) || false;
  },
  buffering : state => state.player.buffering,
  showShareIcons: state => state.player.share,
  played: state => state.player.played,
  chapters: state => state.player.chapters,
  autoplaying: state => state.player.autoplaying,
  cantPlay: state => state.player.cantPlay
}