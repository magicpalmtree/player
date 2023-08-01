import {ref, computed} from 'vue'
import usePlayer from './usePlayer';

const hidden = ref(true);
const timeout = ref(true);
const chaptersOpen = ref(false);
const sharesOpen = ref(false);

export default function useControlBar () {
    const showControlBar = () => {
        clearTimeout(timeout.value);

        hidden.value = false;
        timeout.value = setTimeout(()=>{
            hidden.value = true;
            const { setVolumeControlOpen } = usePlayer();
            setVolumeControlOpen(false);
        }, 3000)
    }

    const hideControlBar = () => {
        clearTimeout(timeout.value);
        hidden.value = true;
        const { setVolumeControlOpen } = usePlayer();
        setVolumeControlOpen(false);
    }

    const toggleChapters = () => {
        chaptersOpen.value = !chaptersOpen.value;        
    }

    const toggleShare = () => {
        sharesOpen.value = !sharesOpen.value;
    }

    return {
        showControlBar, hideControlBar, toggleChapters, toggleShare,
        chaptersOpen, hidden, sharesOpen
    }
}