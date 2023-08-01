import { elementTypes } from './constants';
import Element from './Element'

export default class Interaction{
    static types = elementTypes;

    constructor(data) {
        let errs = this.validate(data);
        if (errs.length) {
            console.warn(errs);
        }
        this.id = data.id;
        this.nodeId = data.node_id;
        this.type = data.element_type;
        this.timeIn = data.timeIn;
        this.timeOut = data.timeOut;
        this.elementGroup = data.element_group_id;
        this.pauseWhenShown = !!data.pause_when_shown;
        this.elementId = data.element_id;
        this.element = new Element(data.element, this.type);
    }

    validate(data) {
        return [];
    }
}
