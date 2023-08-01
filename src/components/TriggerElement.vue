<template>
    <span></span>
</template>
<script>

import useAction from '../hooks/useAction';
import usePlayer from '../hooks/usePlayer';
import useModal from "../hooks/useModal";

export default {
    name: 'TriggerElement',

    props: ['element', 'interaction'],
    setup(){
        const { handleAction } = useAction();
        const { currentTime } = usePlayer();
        return { handleAction, currentTime };
    },
    // mounted() {
    //     this.handleAction({ action: this.element.action, actionArg: this.element.actionArg, openUrlInNewTab:true})
    // }, 

    data() {
        
        return {
            fired: false
        };
    },

    watch: {
        currentTime(newVal) {
            // Trigger element works just as a button click but it happens at a set time
            if (!this.fired && newVal > this.interaction.timeIn) {
                this.fired = true;
                this.handleAction({ action: this.element.action, actionArg: this.element.actionArg, openUrlInNewTab:true})
            }

            // This resets the fired if the video goes back to before the time in
            if (this.fired && newVal < this.interaction.timeIn) {
                this.fired = false;
            }
        }
    }
};
</script>
