<template>    
    <img :src="src" :class="{'thumbnail': true, 'hidden': hidden}" alt="thumbnail" />    
</template>

<script>

import useProject from '../hooks/useProject';
import useProjectSize from '../hooks/useProjectSize';

export default {
    name: 'Thumbnail',
    setup() {
        const { project } = useProject();
        const { playerWidth, playerHeight } = useProjectSize();
        return {
            project,
            playerWidth,
            playerHeight
        };
    },
    computed: {        
        src() {
            return this.project.image_url + "?width=" + this.playerWidth + "&height=" + this.playerHeight;
        },
        hidden() {
            if(this.project.image_url)
                return false;

            return true;
        }
    }
};
</script>

<style scoped>
.thumbnail {
    width: 100%;
    height: auto;
    display: block;
    position: absolute;    
    left: 0;
}

.hidden {
    opacity: 0;
}
</style>