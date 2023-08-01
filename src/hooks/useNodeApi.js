import axios from 'axios';

export default function useNodeApi(){
    
    const checkUserState = async (userId) => {
        try {
            const res = await axios.post(import.meta.env.VITE_NODE_API, {
                userId
            });
            return res.data;
        } catch(e) {
            console.log(e);
        }
        return false;
    }

    return {
        checkUserState
    }
}