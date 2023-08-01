<template>
    <div
        ref="nodeEl"
        :class="[
            'absolute top-0 left-0 right-0 bottom-0',
            isActive ? 'z-30 active' : '',
            isNext ? 'z-20 next' : '',
        ]"
    >
        <div v-if="isActive">
            <Interaction
                v-for="interaction in node.interactions"
                :interaction="interaction"
                :elementGroups="node.elementGroups"
                :key="interaction.id"
            />
        </div>
        <div
            class="absolute top-0 bottom-0 left-0 right-0 z-20"
            @click="!ended && setPlaying(!playing)"
        />
        <BackgroundMedia  :node="node" />

    </div>
</template>

<script setup>
import Interaction from './Interaction.vue';
import useAction from '../hooks/useAction';
import { ref, computed, watch, onMounted } from 'vue';
import useNode from '../hooks/useNode';
import usePlayer from '../hooks/usePlayer';
import useMedia from '../hooks/useMedia';
import BackgroundMedia from './BackgroundMedia.vue';
import anime from 'animejs';
import useProject from '../hooks/useProject';

const { activeNodeId, nodes, nextNodeId, setNextNodeId, setActiveNodeId, endTransition } = useNode();
const { addToCacheList, setActiveMediaId } = useMedia();
const { nodeComplete } = useAction();
const { ended, playing, setPlaying, autoplay, setMuted } = usePlayer();
const { project }  = useProject();

const nodeEl = ref(null);

const props = defineProps({
    node: {},
});

const isActive = computed(() => {
    return activeNodeId.value === props.node.id;
});

const isNext = computed(() => {
    return nextNodeId.value === props.node.id;
});

const shouldExit = computed(() => {
    return isActive.value && nextNodeId.value > 0;
});

watch(shouldExit, (newVal) => {
    let animation = props.node.completeAnimation;
    if (newVal) {
        if(animation == '' || animation == null || !window.node_animations[animation]) {
            animation = 'fadeOut';
        }
        let animationObj = window.node_animations[animation].anime;
        animationObj = {
            ...animationObj,
            easing: 'easeOutSine',
            duration: 750,
        };
        let anim = anime({
            ...{ targets: nodeEl.value },
            ...animationObj,
        });
        anim.finished.then(()=>{
            endTransition()
            nodeEl.value.style.opacity = '1';
        });
    }
});

watch(ended, (newVal) => {
    if (newVal && isActive.value) {
        nodeComplete(props.node);
    }
});

watch(playing, (newVal) => {
    if (
        newVal &&
        isActive.value &&
        props.node.completeAction === 'playNode' &&
        props.node.completeActionArg > 0 &&
        nodes.value[props.node.completeActionArg]
    ) {
        addToCacheList(nodes.value[props.node.completeActionArg].media_id);
    }
});

onMounted(() => {
    if (
        autoplay.value &&
        isActive.value
    ) {
        setPlaying(true);
        setMuted(true);
        if(props.node.completeAction === 'playNode' && props.node.completeActionArg > 0 && nodes.value[props.node.completeActionArg])
            addToCacheList(nodes.value[props.node.completeActionArg].media_id);
    }
});

</script>
<style lang="scss" scoped></style>
