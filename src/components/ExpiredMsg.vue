<template>
    <div class="cant_play_msg">
        <div class="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-90"></div>
        <p class="msg">Unable to play video</p>
    </div>
</template>

<script>
export default {
    name: 'ExpiredMsg'
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
    /* padding: 0 40px; */
    /* font-family: 'Quicksand', sans-serif; */
    font-size: 1.9em;
    /* background: #ececec; */
    color: white;
    z-index: 5100;
}

.msg {
    /* width: 100%; */
    padding: 15px;
    border-radius: 15px;
    text-align: center;
    background-color: rgb(146 5 5 / 50%);;
    z-index: 99999;
}

</style>