<template>
    <li :style="{background}" @click="$emit('click')" @mouseover="showTooltip" @mouseleave="hideTooltip">
        <i :class="icon" ></i>
        <div v-if="open && text" class="absolute left-10 text-lg px-2 rounded bg-gray-900">
            <div class="absolute -left-1 top-2.5 h-2 w-2 rotate-45 scale-y-0.5 transform bg-gray-900"></div>
            {{text}}
        </div>
    </li>
</template>

<script setup>

import { ref } from 'vue';

const open = ref(false);

const props = defineProps({
    icon:'',
    text:{},
    background: {}
});

const showTooltip = () => {
    open.value = true;
}

const hideTooltip = () => {
    open.value = false;
}

</script>

<style scoped lang="scss">
    li {
        width: 35px;
        height: 35px;
        color: white;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.1s linear all;

        &:hover {
            transform: scale(1.05);
        }

        &:first-of-type {
            border-top-right-radius: 10px;
        }

        &:last-of-type {
            border-bottom-right-radius: 10px;
        }
    }
</style>