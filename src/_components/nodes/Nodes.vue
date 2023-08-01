<template>
    <div class="nodes">
        <Node v-for="node in nodes" :key="node.id" :node="node" />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Node from './Node.vue';
import { EventBus } from '@lib/EventBus';

export default {
    name: 'Nodes',
    components: {
        Node
    },
    computed: {
        ...mapGetters(['nodes'])
    }
};
</script>
<style scoped>
.nodes {
    position: absolute;
    z-index: 3000;
    opacity: 1;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>