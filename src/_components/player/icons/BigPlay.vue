<template>
    <icon
        name="play-circle"
        :size="size"
        :style="{color}"
        @click="$emit('click')"
    />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'BigPlayIcon',
    computed: {
        ...mapGetters(['skin']),
        size() {
            return this.skin?.bigPlay.size + 'x';
        },
        color(){
          // const searchParams = new URLSearchParams(window.location.search);
          // if(searchParams.has('bigPlayColor')) return searchParams.get('bigPlayColor');

          if(this.skin) return this.skin.bigPlay.color;

          return 'white'
        }
    }
};
</script>
