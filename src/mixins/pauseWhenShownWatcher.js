import {mapMutations} from 'vuex';

export default {
    methods: {
        ...mapMutations(['pause']),
    },

    watch:{
        showElement(newVal){
            if (newVal && this.interaction.pause_when_shown) {
                this.pause();
            }
        }
    }
}