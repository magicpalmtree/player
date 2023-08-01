import Vue from "vue";

export default {
  // loadVideo(state, {mediaId, zIndex, nodeId, duration, type, videoId}) {
  //   // const video = state.videos.items[ id ];
  //   //
  //   // if(! video) {
  //   //   console.error('Unable to load Video ID, the video was not found');
  //   //   return;
  //   // }
  //
  //   Vue.set(state.videos.videoQueue, parseInt( nodeId ), {
  //     zIndex,
  //     mediaId,
  //     duration,
  //     type,
  //     videoId,
  //     status: 'loading'
  //   });
  // },
  // /** Remove a video from the queue once current one is loaded */
  // removeVideoFromQueue(state, id){
  //   Vue.delete(state.videos.videoQueue, id);
  // },
  // /** Finds the id in the video queue and sets the status to ready */
  // setVideoReady(state, nodeId){
  //   const queueItem = state.videos.videoQueue[ nodeId ];
  //
  //   Vue.set( state.videos.videoQueue[ nodeId ], 'status', 'ready' );
  //
  //   // state.videos.active = queueItem.videoId;
  // },
}