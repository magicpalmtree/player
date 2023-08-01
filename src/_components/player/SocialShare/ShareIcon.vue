<template>
    <li :style="{background}" v-tooltip.right="text" @click="$emit('click')">
        <font-awesome-icon  :icon="icon" />
            <!-- <icon :icon="icon" /> -->

    </li>
</template>

<script>
    export default {
        name: "ShareIcon",
        props:{
            icon:{},
            text:{},
            background: {}
        }
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