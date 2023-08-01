<template>
<!--    <div class="modals">-->
  <!--        <modal v-for="(modal, key) in modals" :key="key" :modal="modal"></modal>-->
  <!--    </div>-->
      <div class="modals">
        <modal v-if="activeModalId"  :modal="activeModal"></modal>
      </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import modal from './Modal.vue';

    export default {
        name:'Modals',
        components:{modal},

        computed:{
            ...mapGetters([
                'modals', 'activeModalId'
            ]),

          activeModal(){
              if(! this.activeModalId) return false;

              return this.modals[this.activeModalId];
          }
        }
    }
</script>
<style scoped>
/*.modals {*/
/*    position: absolute;*/
/*    z-index: 4000;*/
/*    opacity: 1;*/
/*    height: 100%;*/
/*    width: 100%;*/
/*    top: 0;*/
/*    left: 0;*/
/*    right: 0;*/
/*    bottom: 0;*/
/*}*/
</style>