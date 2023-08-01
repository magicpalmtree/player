import { ref, watch } from 'vue';
import useControlBar from './useControlBar';

const {hideControlBar, showControlBar} = useControlBar();
const playing = ref(false); 
const cantPlay = ref(false);
const muted = ref(false);
const volume = ref(0.5);
const inFullScreen = ref(false);
const buffering = ref(false);
const duration = ref(0.00);
const currentTime = ref(0.00);
const volumeControlOpen = ref(false)
const ended = ref(false);
const skipToTime = ref(0);
const error = ref("");
const autoplay = ref(false);
const played = ref(false);
const expired = ref(false);
const minsAllowed = ref(100);

export default function usePlayer() {
    watch(playing, (newVal)=>{
        if(newVal){
            hideControlBar();
        }else {
            showControlBar();
        }
    })

    const setPlaying = val => { 
        if(val && expired.value) {
            setExpired(true);
            return;
        }
        playing.value = val;
        if(val) {
            setEnded(false);
        }
    }
    const setCantPlay = val => cantPlay.value = val;
    const setMuted = val => muted.value = val;
    const setVolume = val => volume.value = val;
    const setInFullScreen = val => inFullScreen.value = val;
    const setBuffering = val => buffering.value = val;
    const setDuration = val => duration.value = val.toFixed(2);
    const setCurrentTime = val => currentTime.value = val.toFixed(2);
    const setVolumeControlOpen = val => volumeControlOpen.value = val;
    const setEnded = val => ended.value = val;
    const setError = val => error.value = val;
    const setPlayed = val => played.value = val;
    const setExpired = val => expired.value = val;

    const setSkipToTime = (time) => {
        if(time){
            skipToTime.value = time;
        }
    }

    const setAutoplay = val => autoplay.value = val;

    return {
        playing, cantPlay, muted, volume, inFullScreen, buffering, duration, autoplay, played, volumeControlOpen,
        ended, skipToTime, currentTime, expired, minsAllowed,
        setPlaying, setCantPlay, setVolume, setMuted, setInFullScreen, setBuffering, setDuration, setCurrentTime, 
        setVolumeControlOpen, setEnded, setSkipToTime, setPlayed, setError, setAutoplay, setExpired
    };
}
