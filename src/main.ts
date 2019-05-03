import Vue from 'vue';
import VueThinModal from 'vue-thin-modal'
import App from './app.vue';
import 'vue-thin-modal/dist/vue-thin-modal.css'

Vue.use(VueThinModal)

new Vue({
    el: "#app",
    render: h => h(App)
});