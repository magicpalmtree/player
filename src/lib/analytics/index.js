import core from './core';

/**
 * The public methods for the analytics class
 */

export default class AnalyticsInterface extends core {
    constructor(projectId) {
        super(projectId);

        // this.impression();
    }

    async view() {
        const country_code = await this.getCountryCode();

        this.post({
            unique: this.isUnqiue(),
            country_code,
            device: this.getDevice()
        }, 'project-view')
    }

    impression() {
        this.post({}, 'impression');
    }

    interaction(nodeId){
        this.interactions += (this.interactions) ? ',' + nodeId : nodeId;
        this.post({
            view_path: this.interactions
        }, 'node-interactions')
    }

    projectViewDuration(duration){
        const timestamp =  this.mmss(duration);

        this.post({timestamp}, 'project-duration');
    }

    nodeViewDuration(percentage_viewed, node_id){
        this.post({percentage_viewed, node_id}, 'node-duration');
    }

    elementClick(node, interaction){
        const node_id = (node) ? node.id : false;
        const project_id = (node) ? node.project_id : false;
        const interaction_id = (interaction) ? interaction.id : false;
        
        if(node_id && project_id && interaction_id) {
            this.post(
                {node_id, project_id, interaction_id}
                , 'element-click');
        }

        else {
            console.warn(
              'Unable to post analytics element click missing data { ' +
              'node_id: ' + node_id,
              'project_id: ' + project_id,
              'interaction_id: ' + interaction_id,
            );
        }
    }

    elementView(node, interaction) {
        const node_id = (node) ? node.id : false;
        const project_id = (node) ? node.project_id : false;
        const interaction_id = (interaction) ? interaction.id : false;

        if(node_id && project_id && interaction_id) {
            this.post(
              {node_id, project_id, interaction_id}
              , 'element-impression');
        }

        else {
            console.warn(
              'Unable to post analytics element view missing data { ' +
              'node_id: ' + node_id,
              'project_id: ' + project_id,
              'interaction_id: ' + interaction_id,
            );
        }
    }

    modalElementView(node, modal_element) {
        const node_id = (node) ? node.id : false;
        const project_id = (node) ? node.project_id : false;
        const modal_element_id = (modal_element) ? modal_element.id : false;

        if(node_id && project_id && modal_element_id) {
            this.post(
              {node_id, project_id, modal_element_id}
              , 'element-impression');
        }

        else {
            console.warn(
              'Unable to post analytics modal element view missing data { ' +
              'node_id: ' + node_id,
              'project_id: ' + project_id,
              'modal_element_id: ' + modal_element_id,
            );
        }
    }

    modalElementClick(node, modal_element){
        const node_id = (node) ? node.id : false;
        const project_id = (node) ? node.project_id : false;
        const modal_element_id = (modal_element) ? modal_element.id : false;

        if(node_id && project_id && modal_element_id) {
            this.post(
              {node_id, project_id, modal_element_id}
              , 'element-click');
        }

        else {
            console.warn(
              'Unable to post analytics modal element click missing data { ' +
              'node_id: ' + node_id,
              'project_id: ' + project_id,
              'modal_element_id: ' + modal_element_id,
            );
        }
    }

    modalView(modal){
        const modal_id  = (modal) ? modal.id : false;

        if(modal_id) {
            this.post(
              {modal_id}
              , 'modal-view');
        }

        else {
            console.warn('Unable to post analytics modal view');
        }
    }

    mediaView(media){
        const media_id = (media) ? media.id : false;

        if(media_id) {
            this.post({ media_id }, 'media-view');
        } else {
            console.warn('Unable to post analytics media view');
        }
    }

    recordMins(nodeId, projectId, userId) {        
        const node_id = nodeId;
        const project_id = projectId
        const user_id = userId;
        this.post({ project_id, user_id, node_id }, 'streaming-mins');
    }

    async checkMins(userId) {
        const now = new Date();
        const firstDayOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
        const lastDayOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));

        const queries = [
            {
                name: 'streaming_mins',
                collection: 'StreamingMins',
                api: 'Interactr',
                filters: {
                    user_id: userId
                },
                start_date: firstDayOfMonth,
                end_date: lastDayOfMonth,
                group_by: 'user_id'
            }
        ];
        const { data } = await this.query(queries, 'query');
        return parseInt(data.streaming_mins[1]);
    }

    // async getMins(userId) {
    //     const data = await this.post({ user_id : userId }, 'get-mins');
    //     if(data) {
    //         return data.amount;
    //     }
    //     return 0;
    // }

    // decreaseMins(userId) {
    //     this.post({ user_id : userId }, 'decrease-mins');
    // }
}

