<template>
    <div class="_wrapper" :class="{'_show':chaptersIn }">
        <div class="_close" @click="toggleChapters">
            <icon name="times" size="lg" />
        </div>
        <ul class="clearfix">
            <Chapter v-for="(chapter, index) in chapters" :chapter="chapter" :key="index" />
        </ul>
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es';
import Chapter from './Chapter.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Chapters',
    components: {
        Chapter
    },

    computed: {
        ...mapGetters({
            nodes: 'nodes',
            showChapters: 'chapters',
            project: 'project'
        }),

        chapters() {
            return this.project.chapter_items
                .reduce((chs, ch) => {
                    if (this.nodes[ch.node_id]) {
                        return [
                            ...chs,
                            { ...ch, index: this.nodes[ch.node_id].sort_order }
                        ];
                    }
                    return chs;
                }, [])
                .sort((ch1, ch2) => (ch1.index > ch2.index ? 1 : -1));
        }
    },

    data: () => ({
        chaptersIn: false
    }),

    mounted() {},

    methods: {
        ...mapMutations(['toggleChapters', 'loadVideo']),

        loadChapters() {
            // forEach(this.chapters, chapter => {
            //     this.loadVideo(chapter.video_id);
            // });
        },

        show() {
            this.chaptersIn = true;
            this.animate({
                opacity: 1,
                scale: 1
            });
        },

        hide() {
            setTimeout(() => {
                // Need to delay this so the animation is nice
                this.chaptersIn = false;
            }, 600);

            this.animate({
                opacity: 0,
                scale: 0
            });
        },

        animate(animation) {
            const targets = this.$el;
            anime.timeline().add(
                Object.assign(
                    {
                        targets,
                        easing: 'linear',
                        duration: 250
                    },
                    animation
                )
            );
        }
    },
    watch: {
        showChapters(newVal) {
            if (newVal) {
                this.show();
            } else {
                this.hide();
            }
        }
    }
};
</script>

<style scoped>
._wrapper {
    transform: scale(0);
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: 0;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    /* overflow-y: scroll; */
    padding-bottom: 40px;
}
._show {
    z-index: 4001;
}
ul {
    max-height: 95%;
    overflow: hidden;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    margin-top: 25px;
}

._close {
    top: 7px;
    left: 10px;
    position: absolute;
    color: white;
}
</style>