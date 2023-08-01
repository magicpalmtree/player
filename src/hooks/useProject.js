import axios from 'axios';
import { ref, computed } from 'vue';
import keyBy from 'lodash/keyBy';
import useConfig from './useConfig';

const { apiUrl, context, analyticsUrl, projectId, projectUrl, appEnv } = useConfig();

const fetching = ref(false);
const fetched = ref(false);
const error = ref(false);
const data = ref(false);

const project = computed(() => {
    if (!fetched.value) return [];
    if (error.value) return [];
    return {
        ...data.value.project,
        shareUrl: data.value.sharePageUrl
    };
});

export default function useProject() {
    const fetch = async () => {
        try {
            fetching.value = true;

            const prefix = projectUrl.value ? projectUrl.value : 'https://p-fast.b-cdn.net/' + appEnv.value + '/projects';
            const endpoint = context.value === 'preview' ? apiUrl.value + '/api/preview/' + projectId.value : prefix + '/' + projectId.value  + '/data.json';
            const req = await axios.get(endpoint);
            data.value = req.data;
            
            fetching.value = false;
            fetched.value = true;
        } catch (err) {
            error.value = err;
            console.error(err);
            fetching.value = false;
            fetched.value = true;
        }
    };

    return {
        fetching,
        fetched,
        error,
        data,
        fetch,
        project,
    };
}
