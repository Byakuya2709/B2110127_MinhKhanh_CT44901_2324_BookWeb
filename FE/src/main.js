

import './index.css'


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./BookApp";
import { jwtDecode } from "jwt-decode";
import { removeToken } from "./BookApp/Helper";
import { removeAuthorization, setAuthorization } from "./BookApp/Api";


const token = localStorage.getItem('token')
if (token) {
    removeToken();
    removeAuthorization();
}


createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
