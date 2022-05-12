import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueGapi from 'vue-gapi'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueGapi, {
    apiKey: "AIzaSyBwZP_gOcqHZXBdb0EVTKAtKUx6ToM8vLc",
    clientId: "514596526831-3skpbqsapmgs6q5s99m8d095svrhua7b.apps.googleusercontent.com",
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    scope: "https://www.googleapis.com/auth/spreadsheets",
  })
  .mount('#app')
