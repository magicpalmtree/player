import axios from "axios";
import useConfig from './useConfig';

export default function useApi() {
    const { apiUrl, analyticsKey } = useConfig();
    const decreaseOverageMins = async (userId) => {
        try {
            const url = apiUrl.value + "/api/" + analyticsKey.value + "/decrease-overage-mins";
            const res = await axios.post(url, {
                userId
            });
            return res.data;
        } catch(e) {
            console.log(e);
        }
        return null;
    }

    return {
        decreaseOverageMins
    }
}