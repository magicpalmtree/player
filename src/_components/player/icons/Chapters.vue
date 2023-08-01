<template >
    <svg-icon name="Chapters" @click="$emit('click')" class="clickable" v-tooltip.top-end="'Chapters'"><Chapters-icon /></svg-icon>
</template>
<script>
import ChaptersIcon from '../../icons/ChaptersIcon.vue';
export default {
    components: {
        ChaptersIcon
    }
}
</script>