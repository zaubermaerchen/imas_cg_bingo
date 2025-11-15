import './assets/main.css'
import 'element-plus/dist/index.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import { createVfm } from 'vue-final-modal'
import App from './App.vue'
import { dependencyProviderPlugin } from '@/plugins/dependencyProviderPlugin.ts'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.use(createVfm())
app.use(dependencyProviderPlugin)
app.mount('#app')
