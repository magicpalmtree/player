import {mapActions, mapGetters, mapMutations} from "vuex";
import {EventBus} from "@lib/EventBus";

export default {
  props:{
    media: {
      description: 'The media item, will be null if no media exists'
    },
    node: {
      type: Object,
      required: true,
      description: 'The parent node of the item'
    }
  },

  computed:{
    ...mapGetters([
      'activeNodeId',
      'playing',
      'played',
      'volume',
      'muted',
      'videos',
      'autoplaying',
      'project',
      'currentTime',
      'nextNodeId',
    ]),

    active() {
      return this.activeNodeId  === this.node.id;
    },

    keymap(){
      return{
        left: this.handleArrowLeft,
        right: this.handleArrowRight,
        space: this.handleSpace,
      }
    }
  },

  mounted(){
    EventBus.$on('loopVideo', ()=>{
      if (this.active) {
        this.ended = false;
        this.loopVideo();
      }
    });

    EventBus.$on('skipTo', time => {
      if (this.active) {
        this.ended = false;

        this.skipTo(time);
      }
    });

    if( this.$refs.video ) {
      this._videoEl = this.$refs.video;
    }

    //this.startLoad();
  },

  data: () => ({
    ended: false,
    // set 9 different times as an array
    analytics_percentages: [],

    // the index of the next analytics percentage to fire
    analytics_fired: 0,

    // Record when this event is fired so we can ensure it's not
    // send too many times
    analytics_view_event_sent: false,

    videoEl: false
  }),

  methods:{
    ...mapActions(['endTransition']),
    ...mapMutations([
      'updateCurrentTime',
      'updateVideoDuration',
      'pause',
      'play',
      'setBuffering',
      'showCantPlayMsg'
    ]),

    setAnalyticsPercentages(duration) {
      const onePercent = duration / 100;
      this.analytics_percentages = [
        onePercent * 10,
        onePercent * 20,
        onePercent * 30,
        onePercent * 40,
        onePercent * 50,
        onePercent * 60,
        onePercent * 70,
        onePercent * 80,
        onePercent * 90
      ];
    },

    handleArrowLeft(){
      let skipTo;

      if(this.currentTime <= 5) {
        skipTo = 0;
      }else {
        skipTo = this.currentTime - 5;
      }

      EventBus.$emit('skipTo', skipTo);
    },

    handleArrowRight(){
      const skipTo =  this.currentTime + 5;
      EventBus.$emit('skipTo', skipTo);
    },

    handleSpace(){
      console.log('space')
      EventBus.$emit('playToggle'); // Emitted to player.vue so its handled with the same function as clicking the play pause icon
    },

    togglePlaying(newVal) {
      if(newVal){
        this.play();
      }
      else {
        this.pause();
      }

      EventBus.$emit('togglePlaying');
    },

    handleTimeUpdate(time){
      if (this.active) {
        this.updateCurrentTime(time);

        if (
          time >
          this.analytics_percentages[this.analytics_fired]
        ) {
          const percent = (this.analytics_fired + 1) * 10;
          window.analytics.nodeViewDuration(
            percent + '%',
            this.node.id
          );
          this.analytics_fired += 1;
        }
      }
    },

    handleEnded(){
      this.ended = true;

      if (this.active) {
        // update playing state , ⚡️ crucial for few places
        this.pause();
        // Analytics should fire regardless of IL
        if(this.media){
          window.fbPixel.nodeEnded(this.node, this.media);
        }

        window.analytics.nodeViewDuration('100%', this.node.id);

        // The end actions are handed in the node component
        EventBus.$emit('nodeEnded', this.node.id);
      }
    },

    mediaViewEvent(){
      if(! this.analytics_view_event_sent) {
        this.analytics_view_event_sent = true;

        if(this.media){
          window.analytics.mediaView(this.media);
        }
      }
    },

    handleAutoplay(){
      if (
        this.project.autoplay &&
        this.startVideo === this.media.id &&
        this.autoplaying
      ) {
        this.play();
      }
    }
  },

  watch: {
    playing(newVal) {
      // console.log('playing state changed..........', newVal);
      if (this.active) {
        this.togglePlaying(newVal);
      }
    },
    volume(newVal) {
      this.setVolume(newVal);
    },
    muted(newVal) {
      this.setMuted(newVal);
    },
    active(newVal) {
      if (newVal) {

        if (this.played) {
          // prevent playing when the first video is loaded in
         // this._videoEl.play();
          // we must update vuex here , this gets triggered mostly on node change
          // handle the vuex incomming update too so it doesn't play an already playing vid
          this.play();

          window.fbPixel.nodePlay(this.node, this.media);
        }
      } else {
        this.pause();
        //this._videoEl.pause();

        // Move video back to the start when we move to a new video
        setTimeout(() => {
          EventBus.$emit('resetVideo');
          this.ended = false;

          // Reset the analytics to false in case it's played again
          this.analytics_fired = 0;
        }, 300);
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.nodeEndInterval)
  }
}