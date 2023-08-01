import { ref } from 'vue';

const context = ref(false);
const analyticsUrl = ref(false);
const apiUrl = ref(false);
const projectId = ref(false);
const analyticsKey = ref(false);
const projectUrl = ref(false);
const appEnv = ref(false);
const previewNodeId = ref(false);

export default function useConfig() {
    const params = new URLSearchParams(window.location.search);
    context.value = params.get('context');
    apiUrl.value = params.get('apiUrl');
    analyticsUrl.value = params.get('analyticsUrl');
    projectUrl.value = params.get('projectUrl');
    appEnv.value = params.get('appEnv');
    analyticsKey.value = "rDhDbEC6rAzFUQ2T";
    projectId.value =
        context.value == 'preview'
            ? params.get('projectId')
            : params.get('hash'); 
    if(params.get('previewNodeId'))
        previewNodeId.value = parseInt(params.get('previewNodeId'));
    return {
        context, apiUrl, analyticsUrl, appEnv,
        projectId, analyticsKey, projectUrl, previewNodeId
    };
}
