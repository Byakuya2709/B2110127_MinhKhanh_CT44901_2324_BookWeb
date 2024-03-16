

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
    const decodedToken = jwtDecode(token);

    if (decodedToken && decodedToken.exp) {
        const expirationTime = decodedToken.exp * 1000;

        const currentTime = Date.now();
        if (currentTime < expirationTime) {
            // Token is not expired
            console.log('Token is valid.');
        } else {
            // Token has expired
            console.log('Token has expired.');
            removeToken();
            removeAuthorization();
        }
    }
    removeToken();
    removeAuthorization();
}


createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
