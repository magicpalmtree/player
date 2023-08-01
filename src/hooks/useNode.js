import {ref, computed} from 'vue'
import useProject from './useProject';
import keyBy from 'lodash/keyBy'
import usePlayer from './usePlayer'

const {data, fetched, error} = useProject();
const {setError, setPlaying, setEnded} = usePlayer();

const nodes = computed(() => {
    if (!fetched.value) return [];
    if (error.value) return [];
    return keyBy(data.value.nodes, "id");
});

const activeNodeId = ref(0);
const nextNodeId = ref(0)

export default function useNode(){
    const setActiveNodeId = id => activeNodeId.value = id;
    const setNextNodeId = id => nextNodeId.value = id;

    const startTransition = id => {
        const node = nodes.value[id];
        setPlaying(false);
        try{
            if(! node) throw "Node ID not found"
            nextNodeId.value = parseInt(id);
        }catch(err){
            setError(err);
            console.error(err)
        }
    }

    const endTransition = () => {
        setActiveNodeId(nextNodeId.value);
        setEnded(false);
        setPlaying(true);
        setNextNodeId(0);
    }

    const getActiveNode = () => {
        return nodes.value[activeNodeId.value];
    }

    return {
        nodes, activeNodeId, nextNodeId,
        startTransition, setActiveNodeId,
        setNextNodeId, endTransition, getActiveNode
    }
}