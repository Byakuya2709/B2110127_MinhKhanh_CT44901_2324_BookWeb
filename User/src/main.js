

import './index.css'


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./BookApp";
import { jwtDecode } from "jwt-decode";
import { removeToken } from "./BookApp/Helper";
import { removeAuthorization, setAuthorization } from "./BookApp/Api";


const token = localStorage.getItem('tokenUser');
console.log("Token: " + token);

if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken && decodedToken.exp) {
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime < expirationTime) {
            console.log('Token is valid.');
            setAuthorization(token);
            store.commit('SET_AUTHENTICATION', {
                isAuthenticated: true,
                isLoggedIn: true,
                user: decodedToken.user,
                token: token,
            });
        } else {
            console.log('Token has expired.');
            removeToken();
            removeAuthorization();
            store.commit('LOGOUT');
        }
    }
} else {
    console.log('Token not found.');
}



createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
