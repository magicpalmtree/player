<template >
    <div style="width:15px" >
        <i v-if="volume === 0 || muted" class="fa-solid fa-volume-xmark fa-xl"></i>
        <i v-else-if="volume > 0.7" class="fa-sharp fa-solid fa-volume-high fa-xl"></i>
        <i v-else-if="volume > 0.3" class="fa-solid fa-volume fa-xl"></i>
        <i v-else class="fa-sharp fa-solid fa-volume-low fa-xl"></i>
    </div>
</template>

<script setup>
import usePlayer from '../hooks/usePlayer'
const {volume, muted} = usePlayer();
</script>
