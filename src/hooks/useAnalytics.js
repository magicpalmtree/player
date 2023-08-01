import {ref, computed} from 'vue'
import Analytics from '../lib/analytics/index'

const analytics = ref({});

export default function useAnalytics(){
    const init = projectId => {
        analytics.value = new Analytics(projectId);
    }

    return {
        init, analytics
    }
}