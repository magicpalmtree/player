<template>
    <li class="_chapter" @click="goToChapter">
        <img :src="chapter.thumbnail" />
        <p>{{chapter.title}}</p>
    </li>
</template>

<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex';

    export default {
        name: "Chapter",
        props:{
            chapter:{
                type: Object,
                required: true
            }
        },

        methods:{
            ...mapActions(['startTransition']),
            ...mapMutations([
                'play',
                'toggleChapters',
            ]),
            goToChapter(){
                this.startTransition(this.chapter.node_id)
                this.toggleChapters();
            }
        }
    }
</script>

<style scoped lang="scss">
._chapter{
    width: 20%;
    margin-left: 2.5%;
    margin-top: 2.5%;
    margin-right: 2.5%;
    display: block;
    float :left;
    transition: 0.2s linear background;
    border-radius: 10px;
    cursor: pointer;

    img {
        max-width: 100%;
        display: block;
        border-radius: 10px;
    }

    p {
        color: white;
        font-size: 13px;
        margin-top: 5px;
        margin-bottom: 5px;
        padding : 0 10px;
        // ellipsis stuff
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &:hover {
        background: rgba(0, 0, 0, 0.9);
    }
}
</style>