import { createApp } from 'vue'
import "./index.css"
import App from './App.vue'
// import store from './store'
// import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
// import SocialSharing from 'vue-social-sharing';
// import Icon from './components/Icon.vue'
// import SvgIcon from './components/SvgIcon.vue'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import iconLib from './lib/icons';
// import VTooltip from 'v-tooltip'
// import VueSlider from 'vue-slider-component';
// import 'vue-slider-component/theme/default.css';
// import VueToast from 'vue-toast-notification';
// import 'vue-toast-notification/dist/index.css';

// Vue.component('VueSlider', VueSlider);

//Vue.use(VTooltip);
//Vue.use(VueToast); // https://www.npmjs.com/package/vue-toast-notification

// plug icons in 
//fontAwesomeLibrary.add(iconLib)

//Vue.component('font-awesome-icon', FontAwesomeIcon);
//Vue.component('icon', Icon) // must come after font-awesome-icon
//Vue.component('svg-icon', SvgIcon) // must come after font-awesome-icon


//Vue.use(SocialSharing);

//Vue.config.productionTip = false;

const app = createApp(App);
app.mount('#app');

//window.bus = new Vue();