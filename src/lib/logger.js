/**
 * Simple function to record errors based on log level
 */

export function debug(message) {
    console.log(message);
    (
        window.log_level === 'debug' &&
        console.log(message)
    )
}

export function warning(message){
    (
        (
            window.log_level === 'debug' ||
            window.log_level === 'warning'
        ) &&
        console.warn(message)
    )
}

export function error(message){
    // TODO need to build some kind of global way to manage to UI when hitting  a global error that breaks
    // the player
    console.error(message)
}