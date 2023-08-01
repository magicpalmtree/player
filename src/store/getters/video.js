import size from 'lodash/size';

const START_QUEUE_Z_INDEX = 2000;

export default {
  activeVideoId: state => state.videos.active,
  videos: state => state.videos.items,
  videoQueue: state =>  state.videos.videoQueue,
  /** If the video queue is empty then the zIndex should be the start zIndex */
  currentZIndex: state => size(state.videos.videoQueue) ? state.videos.videoQueue[ state.videos.active ].zIndex : START_QUEUE_Z_INDEX,
}