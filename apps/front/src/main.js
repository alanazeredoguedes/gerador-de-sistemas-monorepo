import { axios } from './boostrap/index'
import { createApp } from 'vue'
import BaseTemplate from './layouts/BaseTemplate.vue'
import router from './router'
import store from "./store";
import vSelect from "vue-select"
import 'vue-select/dist/vue-select.css';
import { functions } from "./functions/import";
import $ from 'jquery'


window.jQuery = window.$ = $



const app = createApp(BaseTemplate)

app.use(router)
app.use(store)


app.component('v-select', vSelect)

app.config.globalProperties.$functions = functions;



app.mount('#app')

if(store.state.userStore.items.authenticated){
    store.dispatch("getUserAuthenticated")
}

//store.dispatch("getApplications")

