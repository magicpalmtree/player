import keyBy from 'lodash/keyBy';
// import Interaction from '../../core/Interaction.js';
// import Node from '../../core/Node.js';

export default {
    nodes: state => state.nodes.items,
    activeNodeId: state => state.nodes.active,
    node: state => state.nodes.items[state.nodes.active],
    elementGroups: state => {
        if(state.nodes.items && state.nodes.active) {
            const elementGroupsArr =
              state.nodes.items[state.nodes.active].element_groups;

            return Array.isArray(elementGroupsArr) && elementGroupsArr.length
              ? keyBy(elementGroupsArr, 'id')
              : {};
        }

        return {};
    },
    nextNodeId: state => state.nodes.next,
};

