import { ref } from 'vue';
import isMobile from 'ismobilejs';

const project = ref(false);
const dynamicParams = ref({});
const mobile = ref(isMobile().phone);
const editingMode = ref(false);
const editingStatus = ref('initial');

export default function useState() {
    const setProject = val => project.value = val;
    const setMobile = val => mobile.value = val;
    const setDynamicParams = val => dynamicParams.value = val;
    const setEditingMode = val => editingMode.value = val;
    const setEditingStatus = val => editingStatus.value = val;

    return {
        project, dynamicParams, mobile, editingMode, editingStatus,
        setProject, setMobile, setDynamicParams, setEditingMode, setEditingStatus
    };
};