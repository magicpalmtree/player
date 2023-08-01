<template>
    <!-- <icon name="share" @click="$emit('click')" class="clickable" v-tooltip="'Share'" /> -->
    <svg-icon title="share" @click="$emit('click')" class="clickable" v-tooltip="'Share'">
        <share-icon />
    </svg-icon>
    <!-- <font-awesome-icon icon="share" /> -->
</template>

<script>
import ShareIcon from '../../icons/ShareIcon.vue';
export default {
    name: 'Share',
    components: {
        ShareIcon
    }
};
</script>

<style scoped>
</style>