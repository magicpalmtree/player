export default {
    project: state => state.project,
    controls: state =>
        state.project.player_skin && state.project.player_skin.controls,
    skin: state => state.project.player_skin,
    shareData: state => state.project.share_data,
    projectHash: state => {
        let storagePath = state.project.storage_path;
        return typeof storagePath == 'string' ? storagePath.split('/')[1] : '';
    }
};
