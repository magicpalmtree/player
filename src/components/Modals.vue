<template>
    <!--    <div class="modals">-->
      <!--        <modal v-for="(modal, key) in modals" :key="key" :modal="modal"></modal>-->
      <!--    </div>-->
    <div class="modals">
        <modal v-if="activeModalId"  :modal="activeModal"></modal>
    </div>
</template>
<script>
import modal from './Modal.vue';
import useModal from '../hooks/useModal';
import useAnalytics from '../hooks/useAnalytics';

export default {
    name:'Modals',
    components:{modal},
    setup() {
        const { modals, activeModalId } = useModal();
        const { analytics } = useAnalytics();
        return {
            modals, activeModalId, analytics
        };
    },
    computed: {
        activeModal(){
            if(! this.activeModalId) return false;
            return this.modals[this.activeModalId];
        }
    },
    watch: {
        activeModalId(val) {
            if(val) {
                this.analytics.modalView(this.modals[val]);
            }
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