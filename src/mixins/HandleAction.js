import { mapMutations, mapGetters, mapActions } from 'vuex';
import {EventBus} from "@lib/EventBus";

export default {
    computed: {
        ...mapGetters({
            isMobile: 'isMobile',
            activeModalId: 'activeModalId',
            autoplaying: 'autoplaying',

            // Node is a prop in some places where this mixin is used so we need to
            // give this property a more specific name for our use case
            nodeForActionAnalytics: 'node'
        }),

        hasActionOnCompletion() {
            return this.node.completeAction && this.node.completeActionArg;
        },
    },

    methods: {
        ...mapMutations([
            'pause',
            'play',
            'setActiveModal',
            'closeModal',
        ]),

        ...mapActions([
            'startTransition',
            'unMuteAutoplay'
        ]),

        handleClick() {
            window.fbPixel.interaction(this.element);

            if(this.isModalElement) {
                window.analytics.modalElementClick(this.nodeForActionAnalytics, this.modalElement);
            }else {
                window.analytics.elementClick(this.nodeForActionAnalytics, this.interaction);
            }


            EventBus.$emit('click');
            const openUrlInNewTab = this.element.open_in_new_tab;
            this.handleAction(this.element.action, this.element.actionArg, {openUrlInNewTab});
        },

        /** Handles node related end actions , action on complete or looping etc... */
        handleNodeCompleteAction() {
            if(this.hasActionOnCompletion) {
                this.handleAction(this.node.completeAction, this.node.completeActionArg);
            }
        },


        handleAction(action, arg,  { hide = false, openUrlInNewTab } = {}) {
            // if(this.autoplaying){
            //     this.unMuteAutoplay();
            // }

            switch (action) {
                case 'playNode':
                    EventBus.$emit('forceHideControlBar');
                    window.analytics.interaction(arg);

                    if (arg) {
                        this.startTransition(arg);
                    }

                    // Cleanup
                    this.setActiveModal(false);
                    this.hide = true;
                    break;

                case 'openUrl':
                    if (arg) {
                        this.pause();

                        if (!arg.startsWith('http')) {
                            arg = 'http://' + arg;
                        }

                        if (openUrlInNewTab) {
                            let win = window.open(arg, 'rel=noopener');
                            win.focus();
                        } else window.top.location = arg;
                    }

                    break;

                case 'openModal':
                    this.setActiveModal(arg);
                    this.pause();
                    break;

                case 'skipToTime':
                    // Send an event out that the video will pick up to skip time
                    // can't really do this via the store without it getting messy
                    EventBus.$emit('skipTo', parseInt(arg));

                    // Play the video here just because the video may be paused when the element
                    // is shown
                    setTimeout(() => {
                        this.play();
                        if(this.activeModalId) this.closeModal()
                    }, 500);
                    break;

                case 'closeModal':
                    this.closeModal();
                    break;

                case 'play':
                    this.play();
                    // sometimes closing a modal is the whole point of this action
                   if(this.activeModalId) this.closeModal();
            }
        }
    }
};
