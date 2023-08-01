<template>    
    <i 
        :class="classes" 
        :style="{color}"
        @click="$emit('click')" 
    ></i>
</template>

<script>

import useProject from '../hooks/useProject';

export default {
    name: 'BigPlayIcon',
    setup() {
        const { project } = useProject();
        return { project };
    },
    computed: {
        classes() {            
            return 'fa-regular fa-circle-play fa-' + this.project.player_skin?.bigPlay.size + 'x';
        },
        color(){
          // const searchParams = new URLSearchParams(window.location.search);
          // if(searchParams.has('bigPlayColor')) return searchParams.get('bigPlayColor');

          if(this.project.player_skin) return this.project.player_skin.bigPlay.color;

          return 'white'
        }
    }
};
</script>
