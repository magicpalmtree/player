import { elementTypes } from './constants';
import Element from './Element';

export default class Modal {
    static types = elementTypes;

    constructor(data) {
        let errs = this.validate(data);
        if (errs.length) {
            console.warn(errs);
        }
        this.id = data.id;
        this.name = data.name;
        this.projectId = data.project_id;
        this.backgroundColour = data.backgroundColour;
        this.showCloseIcon = !!data.show_close_icon;
        this.borderRadius = data.border_radius;
        this.size = data.size;
        this.closeIconColor = data.close_icon_color;
        this.interactionLayer = !!data.interaction_layer;
        this.backgroundAnimation = data.background_animation;
        this.elements = data.elements.map(
            modalElement =>
                new Element(modalElement.element, modalElement.element_type)
        );
    }

    validate(data) {
        return [];
    }
}
