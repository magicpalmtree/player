<template>
    <video
            ref="video"
            playsinline="1"
            preload="auto"
            :muted="true"
            disablepictureinpicture
            data-testId="video"
            v-hotkey="keymap"
        ></video>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>