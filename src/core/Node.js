import keyBy from 'lodash/keyBy';

import Interaction from './Interaction';
import Modal from './Modal';

export default class Node {
    static actionsOnEnd = Object.freeze({
        PLAY_NODE: 'playNode'
    });
    constructor(data, modals = {}) {
        this.id = data.id;
        this.name = data.name;
        this.projectId = data.project_id;
        this.description = data.description;
        this.completeAction = data.completeAction;
        this.completeActionArg = data.completeActionArg;
        this.mediaId = data.media_id;
        this.hasChapters = !!data.hasChapters;
        this.sortOrder = data.sort_order;
        this.loop = !!data.loop;
        this.interactionLayerId = data.interaction_layer_id;
        this.enableInteractionLayer = !!data.enable_interaction_layer;
        this.media = data.media;
        this.interactions = keyBy(
            data.interactions.map(i => new Interaction(i)),
            'id'
        );
        this.elementGroups = keyBy(data.elementGroups, 'id');
        this.modals = this._extractModals(modals);
    }
    playsNodeOnEnd() {
        return this.completeAction === Node.actionsOnEnd.PLAY_NODE &&
            this._validActionArg(this.completeActionArg)
            ? Number(this.completeActionArg)
            : null;
    }
    getElements() {
        return Object.values(this.interactions).map(i => i.element);
    }
    /** Returns all potentially playable next nodes ids from interacting with an element
     * @returns {Number[]} ids of nodes
     */
    getPotentialNextNodes() {
        const nextNodes = {};
        if (this.playsNodeOnEnd() && !(this.completeActionArg in nextNodes)) {
            nextNodes[this.completeActionArg] = Number(this.completeActionArg);
        }
        const nodeElements = this.getElements();

        const nodeModalsElements = Object.values(this.modals).reduce(
            (els, modal) => els.concat(modal.elements),
            []
        );

        nodeElements.concat(nodeModalsElements).forEach(e => {
            const nodeToPlay = e.playsNode();
            if (nodeToPlay && !(nodeToPlay in nextNodes)) {
                nextNodes[nodeToPlay] = nodeToPlay;
            }
        });
        return Object.values(nextNodes);
    }

    _extractModals(modals) {
        const _modals = {};
        Object.values(this.interactions).forEach(i => {
            if (i.type === Interaction.types.MODAL_TRIGGER) {
                const modalId = i.element.opensModal();
                const targetModal = modals[modalId];
                if (targetModal) {
                    _modals[modalId] =
                        targetModal instanceof Modal
                            ? targetModal
                            : new Modal(targetModal);
                }
            }
        });
        return _modals;
    }
    _validActionArg(actionArg) {
        return actionArg && Number.isInteger(Number(actionArg));
    }
}
