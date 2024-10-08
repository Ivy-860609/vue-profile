import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.directive('focus', (el, binding) => {
    // 這會在 `mounted` 和 `updated` 時都調用
    el.focus()
})

app.use(router)

app.mount('#app')
