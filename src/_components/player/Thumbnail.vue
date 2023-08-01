<template>
    <img :src="src" :class="{'thumbnail': true, 'hidden': hidden}" alt="thumbnail" />
</template>

<script>
//import { mapGetters } from 'vuex';
import { getUrlParameter } from '../../lib/utils';
//import projectSize from "@mixins/projectSize";

export default {
    name: 'Thumbnail',

    computed: {
        ...mapGetters(['project',  'videos', 'nodes']),
        src() {
            if (window.location.href.includes('startNodeId')) {
                const node = this.nodes[getUrlParameter('startNodeId')];
                const video = this.videos[node?.media_id];
                return video ? video.thumbnail_url : this.project.image_url;
            }
            return this.project.image_url + "?width=" + this.playerWidth + "&height=" + this.playerHeight;
        },
        hidden() {
            if (window.location.href.includes('startNodeId')) {
                const node = this.nodes[getUrlParameter('startNodeId')];
                const video = this.videos[node?.media_id];
                if(video && video.thumbnail_url) return false;
                if(this.project.image_url) return false;
                return true;
            }
            if(this.project.image_url)
                return false;

            return true;
        }
    },

    //mixins: [projectSize],

};
</script>

<style scoped>
.thumbnail {
    width: 100%;
    height: auto;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
}

.hidden {
    opacity: 0;
}
</style>