import './assets/main.css'
import 'element-plus/dist/index.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createVfm } from 'vue-final-modal'
import App from './App.vue'
import { dataSourcePlugin } from '@/plugins/dataSourcePlugin.ts'

const app = createApp(App)
app.use(ElementPlus)
app.use(createVfm())
app.use(dataSourcePlugin)
app.mount('#app')
