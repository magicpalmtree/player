import {elementTypes} from './constants'

export default class Element {
    static types = elementTypes;

    static actions = Object.freeze({
        PLAY_NODE: 'playNode',
        OPEN_URL: 'openUrl',
        OPEN_MODAL: 'openModal',
        SKIP_TO_TIME: 'skipToTime',
        CLOSE_MODAL: 'closeModal'
        // PLAY : 'play' , // used sometimes for playing from modal
    });

    constructor(data , type) {
        // TODO Remove this and it's usage everywhere after creating constructors implemented
        this.data = data;

        this.id = data.id;
        this.action = data.action;
        this.actionArg = data.actionArg;

        const types = Element.types;
        // use relevant constructor here
        switch (type) {
          case types.BUTTON:
            this._createButtonElement(data) 
            break;
          case types.TEXT:
            this._createTextElement(data) 
            break;
          case types.FORM:
            this._createFormElement(data) 
            break;
          case types.HOTSPOT:
            this._createHospotElement(data) 
            break;
          case types.IMAGE:
            this._createImageElement(data) 
            break;
          case types.CUSTOM_HTML:
            this._createCustomHtmlElement(data) 
            break;
          case types.MODAL_TRIGGER:
            this._createTriggerElement(data) 
            break;
        
          default:
            break;
        }
    }
    /** Returns the node to be played from this element if relevant */
    playsNode() {
        return this.action === Element.actions.PLAY_NODE &&
            this._validActionArg(this.actionArg)
            ? Number(this.actionArg)
            : null;
    }

    /** Returns Modal id if it's a trigger element */
    opensModal() {
        return this.action === Element.actions.OPEN_MODAL &&
            this._validActionArg(this.actionArg)
            ? Number(this.actionArg)
            : null;
    }
    //TODO Implement these for each relevant Element
    _createButtonElement(){}
    _createTextElement(){}
    _createFormElement(){}
    _createImageElement(){}
    _createHospotElement(){}
    _createCustomHtmlElement(){}
    _createTriggerElement(){}

    /** validates if the action argument is valid, should resemble an Id which are always integers here */
    _validActionArg(actionArg) {
        return actionArg && Number.isInteger(Number(actionArg));
    }
}
