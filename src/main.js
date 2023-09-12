
import App from './App.vue'
import router from './modules/router'

import { createApp } from 'vue'
import Vuetify from 'vuetify'
import { Bootstrap } from 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'

// Vuetify
import { createVuetify } from 'vuetify'
import { VCol } from 'vuetify/components'

const vuetify = createVuetify({
  components: {
    VCol
  }
})


const app = createApp(App)
app.use(router)
app.use(Bootstrap)
// app.use(Vuetify)
app.use(vuetify)
app.mount('#app')

//createApp(App).mount('#app')
