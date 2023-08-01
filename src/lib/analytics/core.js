import {checkAndUpdateLocalStorage} from "../utils";
import axios from 'axios';
import isMobile from 'ismobilejs';
import useConfig from "../../hooks/useConfig";
/**
 * The base / private methods of the analytics class
 */
export default class core {
    constructor(projectId) {
        this.projectId = projectId;
        this.interactions = '';
    }

    isUnqiue(){
        const trackerName = 'tracker_id_' + this.projectId;
        return ! checkAndUpdateLocalStorage(trackerName, true);
    }


    async getCountryCode(){
        // https://ipgeolocationapi.com/
        // https://api.ipgeolocationapi.com/geolocate
        const req = await axios.get('https://pro.ip-api.com/json?key=jx8uAK8h3dej2uC');
        return req.data.countryCode;
    }

    getDevice(){
        return (isMobile().any) ? 'mobile' : 'desktop';
    }

    pad(num) {
        return ("0"+num).slice(-2);
    }
    mmss(secs) {
        var minutes = Math.floor(secs / 60);
        secs = secs%60;
        return `${this.pad(minutes)}:${this.pad(secs)}`;
    }

    async post(data, path){
        try {
            Object.assign(data, {
                project_id: this.projectId
            });
            const { analyticsUrl, analyticsKey } = useConfig();
            const url = analyticsUrl.value + "/api/" + analyticsKey.value + '/interactr/' + path;
            axios.post(url, data);
        } catch(e) {
            console.log(e);
        }
    }

    async query(data, path) {
        try {
            const { analyticsUrl, analyticsKey } = useConfig();
            const res = await axios.post(`${analyticsUrl.value}/api/${analyticsKey.value}/${path}`, data);
            return res;
        } catch(e) {
            console.log(e);
        }
        return null;
    }
}