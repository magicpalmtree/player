export default {
    play(state) {
        state.player.playing = true;
    },
    pause(state) {
        state.player.playing = false;
    },
    setBuffering(state, buffering) {
        state.player.buffering = buffering;
    },
    showCantPlayMsg(state) {
        state.player.cantPlay = true;
    },
    updateMutedStatus(state, val) {
        state.player.muted = val;
    },
    toggleShare(state, val) {
        if (typeof val === 'boolean') state.player.share = !!val;
        else state.player.share = !state.player.share;
    },
    toggleChapters(state, val) {
        if (typeof val === 'boolean') state.player.chapters = val;
        else state.player.chapters = !state.player.chapters;
    },
    updateVideoDuration(state, val) {
        state.player.duration = Math.round(val);
    },
    updateCurrentTime(state, val) {
        const increase = Math.round(val) - state.player.currentTime;
        state.player.currentTime = val;

        // The project time handles the project view duration analytic that fires every 15 seconds
        if (increase > 0) {
            state.player.projectCurrentTime += increase;
            // Is the played time a 15 second interval
            // 👇 Move this into an appropriate place , App or Player
            if (
                state.player.projectCurrentTime % 15 === 0 &&
                state.player.projectCurrentTime !== 0
            ) {
                window.analytics.projectViewDuration(
                    state.player.projectCurrentTime
                );
            }
        }
    },
    updatePlayed(state, val) {
        state.player.played = val;
    },

    updateVolume(state, val) {
        state.player.volume = val;
    },
    updateAutoplaying(state) {
        state.player.autoplaying = false;
    },
    toggleFullScreenEnabled(state, inFullScreen) {
        state.player.inFullScreen = inFullScreen;
    }
};
