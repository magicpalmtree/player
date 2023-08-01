<template>
    <div data-name="interaction" class="interaction">
        <animated-element
            v-if="!isTriggerElement && showElement"
            :element="element"
        >
            <the-element
                :element="element"
                :interaction="interaction"
                :type="interaction.element_type"
            />
        </animated-element>
        <trigger-element
            v-if="isTriggerElement && showElement"
            :element="element"
            :interaction="interaction"
        />
    </div>
</template>
<script>
import theElement from './Element.vue';
import TriggerElement from './TriggerElement.vue';
import AnimatedElement from './AnimatedElement.vue';
import useModal from '../hooks/useModal';
import usePlayer from '../hooks/usePlayer';
import useNode from '../hooks/useNode';
import useMedia from '../hooks/useMedia';

export default {
    name: 'Interaction',
    props: {
        interaction: {
            type: Object,
            required: true,
        },
        elementGroups: {
            type: Object,
            default: {},
        },
    },
    setup(props) {
        const { modals } = useModal();
        const { currentTime, setPlaying, ended, playing } = usePlayer();
        const { activeNodeId, nodes } = useNode();
        const { addToCacheList } = useMedia();
        
        if (playing.value) {
            if (props.interaction.element.action === 'playNode' && props.interaction.element.actionArg > 0) {
                addToCacheList(nodes.value[props.interaction.element.actionArg].media_id);
            }
        }

        return {
            modals,
            currentTime,
            activeNodeId,
            setPlaying,
            playing,
            ended,
            addToCacheList,
            nodes
        };
    },
    components: {
        theElement,
        TriggerElement,
        AnimatedElement,
    },
    data: () => ({
        videoHasEnded: false,
    }),

    computed: {
        element() {
            return this.interaction.element;
        },

        showElementOnVideoEnd() {
            return this.elementGroup
                ? this.elementGroup.show_at_video_end
                : this.interaction.show_at_video_end;
        },

        isTriggerElement() {
            return this.interaction.element_type === 'App\\TriggerElement';
        },

        elementGroup() {
            const interactionGroupId = this.interaction.element_group_id;
            return this.elementGroups[interactionGroupId]; // {} | undefined
        },

        timeIn() {
            return this.elementGroup
                ? this.elementGroup.timeIn
                : this.interaction.timeIn;
        },

        timeOut() {
            return this.elementGroup
                ? this.elementGroup.timeOut
                : this.interaction.timeOut;
        },

        pastElementShowTime() {
            if (this.interaction.show_at_video_end) {
                return this.ended;
            } else {
                return this.currentTime > 0 && this.currentTime >= this.timeIn;
            }
        },

        pastElementHideTime() {
            const roundedPlayingTime = Math.floor(this.currentTime);

            return this.currentTime > this.timeOut + 0.2;
        },

        interactionLayer() {
            const modal = this.modals[parseInt(this.interaction.element.actionArg)];
            if (!modal) return false;
            return modal.interaction_layer;
        },

        /**
         * The main property here that defines if the element should
         * be shown on the player or not.
         */
        showElement() {
            // First we gota check if this interaction is from the
            // active node
            if (this.activeNodeId != this.interaction.node_id) {
                return false;
            }

            return this.pastElementShowTime && !this.pastElementHideTime;
        },
    },
    watch: {
        showElement(newVal) {
            // pause if the interaction should pause video when shown
            /* This here pauses a problem in seeking , when the UI buffering is on it only goes off if the player
      starts playing again which only happens if played automatically, this here will prevent the player from 
      resuming and the buffering UI prevents user from manually playing so ... Current fix is just setting the Buffering UI 
      to not have pointer events so user can play manually when it happens  */
            if (newVal) {
                if (this.elementGroup && this.elementGroup.pause_when_shown) {
                    this.setPlaying(false);
                } else if (this.interaction.pause_when_shown) {
                    this.setPlaying(false);
                }
            }
        },
        playing(newVal) {
            if (newVal) {
                if (this.element.action === 'playNode' && this.element.actionArg > 0) {
                    this.addToCacheList(this.nodes[this.element.actionArg].media_id);
                }
            }
        },
    },
};
</script>
