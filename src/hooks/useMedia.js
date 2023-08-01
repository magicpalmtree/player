import {ref, computed, reactive} from 'vue';
import useProject from './useProject';
import keyBy from 'lodash/keyBy'
import remove from 'lodash/remove'

// Controls the max videos we will load based from 
// the users internet speed
const PRELOAD_LEVELS = {

};

const {data, fetched, error} = useProject();

const medias = computed(() => {
    if (!fetched.value) return [];
    if (error.value) return [];
    return keyBy(data.value.videos, "id")
});


// Media id will go into here when it 
// should preload
let cacheList = reactive([]);

export default function useMedia() {
    // For now we just add in the id, later we can get more
    // smarter here and if a video has 100 views and one has 5
    // views we can prioritise preloading rhe one with 100 views
    const addToCacheList = id => {
        if(! cacheList.includes(id)){
            cacheList.push(id);
        }
    }

    const clearCacheList = () => {
        cacheList = [];
    }

    const removeFromCacheList = id => {
        cacheList = remove(cacheList, (i) => i == id);
    }



    return {
        medias,  cacheList,
        addToCacheList, clearCacheList, 
        removeFromCacheList
    }
}
