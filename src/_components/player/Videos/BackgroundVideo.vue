<template>
    <div class="video_wrapper">
        <video
            ref="video"
            playsinline="1"
            preload="none"
            :muted="true"
            disablepictureinpicture
            data-testId="video"
            v-hotkey="keymap"
        ></video>
    </div>
</template>

<script>
import { debug, warning, error } from '@lib/logger';
import Hls from 'hls.js';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { EventBus } from '@lib/EventBus';
//import handleAction from '@mixins/HandleAction';
import handlePlayer from "@mixins/handlePlayer";


export default {
    name: 'BackgroundVideo',

    mixins: [handleAction, handlePlayer],

    computed: {
        canPlayHlsNatively() {
            return this._videoEl.canPlayType('application/vnd.apple.mpegurl');
        },
    },

    beforeMount() {
        // this._videoEl.disablePictureInPicture();

        // EventBus.$on('setVolume', val => {
        //     this.setVolume(val);
        // });

      EventBus.$on('resetVideo', ()=>{
        if(this.active){
          this._videoEl.currentTime = 0;
        }
      })
    },

    data: () => ({
        hls: false,
    }),

    methods: {
        loopVideo(){
          this._videoEl.currentTime = 0;
          this._videoEl.play();
          this.play();
        },

        skipTo(time){
          this._videoEl.currentTime = time;
        },

        startLoad() {
            if (this.media.manifest_url) {
                if (Hls.isSupported()) {
                    this.loadHls();
                    return;
                } else if (this.canPlayHlsNatively) this.loadSourceUrl(this.media.manifest_url);
                else if(this.media.url) {
                    this.loadSourceUrl(this.media.url)
                    return
                } else this.cantPlayVideo();
            } else if (this.media.url || this.media.temp_storage_url) {
                this.loadSourceUrl(this.media.url || this.media.temp_storage_url);
            } else this.cantPlayVideo()
        },

        loadHls() {
            debug('Video ' + this.media.id + ' loading source via Hls.js...');
            this.hls = new Hls();

            this.hls.attachMedia(this._videoEl);
            this.hls.loadSource(this.media.manifest_url);
            // const testUrl = 'https://swiftcdn6.global.ssl.fastly.net/hls/7d062e12657711eaaf7f4afa53cd1233/playlist.m3u8'
            // this.hls.loadSource(testUrl);

            this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                // console.log('manifest data ........', data);
                this.videoReady();
            });

            // this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            //     // this.hls.on(Hls.Events.)
            // });

            this.hls.on(Hls.Events.ERROR, function(event, data) {
                 console.warn('Hls errored ..........\n', data);
            });
        },

        loadSourceUrl(url) {
            debug('Loading source natively...');

            this._videoEl.src = url;
            this._videoEl.addEventListener('loadedmetadata', () => {
                this.videoReady();
            });
        },

        cantPlayVideo() {
            // todo Do something here to show error to user
            this.showCantPlayMsg();
        },

        videoReady() {
            if (isNaN(this._videoEl.duration)) {

                // IF we don't have the duration yet try again in .2s
                // we can't say the video is ready until this has been
                // loaded in because the timeline wont work.
                setTimeout(() => {
                    this.videoReady();
                }, 200);
                return;
            }

            debug('Video ' + this.media.id + ' is ready to play...');
            this.endTransition(this.node.id);

            if (this.active) {
                this.updateVideoDuration(this._videoEl.duration);
            }
            this.setAnalyticsPercentages(this._videoEl.duration);

            this._videoEl.addEventListener('waiting', e => {
                if (this.active) {
                    this.setBuffering(true);
                }
            });
            this._videoEl.addEventListener('playing', e => {

                if (this.active) {
                    this.setBuffering(false);
                }

              this.mediaViewEvent();
            });
            this._videoEl.addEventListener('stalled', e => {
                if (this.active) {
                    // console.warn('stalled........')
                }
            });

            this._videoEl.addEventListener('timeupdate', event => {
              this.handleTimeUpdate(event.target.currentTime)
            });

            this._videoEl.addEventListener('ended', event => {
               this.handleEnded();
            });

            this.handleAutoplay();
        },



        setVolume(newVal) {
            this._videoEl.volume = newVal;
        },
        setMuted(newVal) {
            this._videoEl.muted = newVal;
        },
    },

    watch: {
      active(newVal){
        if(newVal){
          this.updateVideoDuration(this._videoEl.duration);
        }
      },

      playing(newVal){
        if(this.active){
          if(newVal) {
            this._videoEl.play();
          }else {
            this._videoEl.pause();
          }
        }
      },

      /**
       * Setting the next nodeId triggers the video to load
       * @param newVal
       */
      nextNodeId(newVal){
        if(newVal === this.node.id) {
          this.startLoad();
        }
      }
    },

    beforeDestroy() {
        // destroy hls.js object if not native
        if (this.hls) this.hls.destroy();
    }
};
</script>

<style lang="scss" scoped>
video {
    width: 100% !important;
    height: 100% !important;
    /* z-index: -1;
    opacity: 0;
    transition: 0.2s linear opacity; */
    position: absolute;
    top: 0;
    left: 0;
}
.video_wrapper {
    width: 100% !important;
    height: 100% !important;
    transition: 0.2s linear opacity;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
}
</style>