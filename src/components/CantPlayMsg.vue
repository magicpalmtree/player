<template>
    <div class="cant_play_msg">
        <p>Sorry! this browser doesn't support the format of the media.</p>
    </div>
</template>

<script>
export default {
    name: 'CantPlayMsg'
};
</script>

<style scoped>
.cant_play_msg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    /* font-family: 'Quicksand', sans-serif; */
    font-size: 1.5em;
    font-style: italic;
    background: #ececec;
    color: #685b5b;
    z-index: 5100;
}
</style>