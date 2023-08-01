import Hls from 'hls.js';
import keyBy from 'lodash/keyBy';
import Modal from '../core/Modal';
import Node from '../core/Node';

//TODO: Refactor the hell outta this , Single Responsibility etc...

export default class CacheManager {
    #cached = {};
    #nextCachedFrom = {};
    #hlsSupported = false;

    constructor(data) {
        this.modals = keyBy(
            data.modals.map(m => new Modal(m)),
            'id'
        );
        this.nodes = keyBy(
            data.nodes.map(n => new Node(n, this.modals)),
            'id'
        );
        this.videos = keyBy(data.videos, 'id');
        this.#hlsSupported = Hls.isSupported();
        if (!this.#hlsSupported) {
            console.warn('HLS is not supported on this browser!');
        }
    }

    /** Caches node data */
    cacheNode(nodeId){
        this._cacheMedia(this.nodes?.[nodeId].mediaId)
    }

    /** Caches all potential next nodes from this node */
    cacheNextFromNode(nodeId) {
        if (this.#nextCachedFrom[nodeId]) return;
        const node = this.nodes[nodeId];
        if (node) {
            const nextNodesVideos = node
                .getPotentialNextNodes()
                .map(n => this.nodes?.[n].mediaId);
            this._cacheMedias(nextNodesVideos);
            this.#nextCachedFrom[nodeId] = true;
        }
    }
    /** Caches the video. Loads preload manifest and destroys HLS object after loading
     * @param {String|Number} mediaId
     */
    _cacheMedia(mediaId) {
        if (this.#cached[mediaId]) return;

        const videoToCache = this.videos?.[mediaId];
        if (videoToCache?.manifest_url && this.#hlsSupported) {
            // No need to attach any media , the whole point is loading the chunk to get it cached
            // before actually being loaded later.
            const hls = new Hls({ startFragPrefetch: true });
            hls.loadSource(videoToCache.manifest_url);

            this.#cached[mediaId] = true;
            // hls.on(Hls.Events.LEVEL_PTS_UPDATED, (name, level)=>{
            //   console.log( level)
            // })
            hls.on(
                Hls.Events.STREAM_STATE_TRANSITION,
                (d, streamStateData) => {
                    // frag loaded and parsed , this works better for the pre-caching hack
                    // since it's only a single chunk
                    if (streamStateData.nextState === 'PARSED') {
                        hls.destroy();
                    }
                    // entire stream ended
                    // if (nextState === 'ENDED') {
                    //     hls.destroy();
                    // }
                }
            );
        }
    }

    /** Cache multiple medias
     * @param {String[]} mediaIds Array of media Ids
     */
    _cacheMedias(mediaIds) {
        mediaIds.forEach(id => {
            this._cacheMedia(id);
        });
    }
}
