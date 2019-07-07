import Vue from 'vue';
import VueThinModal from 'vue-thin-modal'
import ElementUI from 'element-ui'
import App from './app.vue';
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-thin-modal/dist/vue-thin-modal.css'

Vue.use(VueThinModal);
Vue.use(ElementUI);

new Vue({
    el: "#app",
    render: h => h(App)
});