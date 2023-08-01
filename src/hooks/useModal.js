import {ref, computed} from 'vue'
import useProject from './useProject';
import usePlayer from './usePlayer';
import keyBy from 'lodash/keyBy'

const {data, fetched, error} = useProject();
const {setPlaying} = usePlayer();

const modals = computed(() => {
    if (!fetched.value) return [];
    if (error.value) return [];
    return keyBy(data.value.modals, "id");
});

const activeModalId = ref(false);

export default function useModal(){

    const setActiveModal = id => activeModalId.value = parseInt(id);
    const closeModal = () => {
        activeModalId.value = false;
        setPlaying(true);
    }

    return {
        modals, activeModalId, setActiveModal, closeModal
    }
}