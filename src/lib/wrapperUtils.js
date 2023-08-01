import constants from '../constants';

/** Wrapper over postMessage that sends event to embedding window with provided event type and data
 * @param {String} eventType type of the event
 * @param {Object} data whatever data that the parent window will get with this event
 */
export function notifyParent(eventType, data = {}) {

    const eventInfo = {
        embeddingId: window.__embeddingId,
        from: constants.ICTR_PLAYER,
        eventType,
        ...data
    };

    // console.log('sending event from app to iframe with data ...', eventInfo )
    window.parent.postMessage(eventInfo, '*');
}
