const constants = Object.freeze({
    ICTR_PLAYER: 'ICTR_PLAYER',
    ICTR_EDITING_PAGE: 'ICTR_EDITING_PAGE',
    ICTR_WRAPPER: 'ICTR_WRAPPER',
    CLASSES: {
        PLAYER: '_vs_ictr_player',
        PLAYER_WRAPPER: '_vs_ictr_player-wrapper'
    },
    PLAYER_EVENTS: {
        READY: 'player:READY',
        TOGGLE_FS: 'player:TOGGLE_FS',
        LOADED: 'player:DATA_LOADED'
    },
    WRAPPER_EVENTS: {
        INIT: 'wrapper:INIT',
        FS_ENABLED: 'wrapper:FS_ENABLED'
    },
    EDITING_EVENTS: {
        SET_EDITING_MODE: 'player:SET_EDITING_MODE',
        SET_EDITING_STATUS: 'player:SET_EDITING_STATUS',
        UPDATE_SETTINGS: 'player:UPDATE_SETTINGS'
    },
    EDITING_STATUSES: {
        INITIAL: 'initial',
        PLAYING: 'playing',
        CHAPTERS: 'chapters',
        SHARING: 'sharing'
    }
});

export default constants;