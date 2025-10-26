import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'
import App from './App.vue'
import inversifyPlugin from '@/plugins/inversifyPlugin.ts'
import container from '@/container.ts'

const app = createApp(App)
app.use(createVfm())
app.use(inversifyPlugin, {
  container,
})
app.mount('#app')
