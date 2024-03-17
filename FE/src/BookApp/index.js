
import Vuex from 'vuex';
import { api, setAuthorization, removeAuthorization } from './Api';

import router from '../router/index'; // Adjust the path based on your project structure
import { setToken, getToken, removeToken } from './Helper';
const state = {
    isLoggedIn: false,
    isAuthenticated: false,
    user: null,
    token: null,
};

const mutations = {
    SET_AUTHENTICATION(state, { isAuthenticated, isLoggedIn, user, token }) {
        state.isAuthenticated = isAuthenticated;
        state.isLoggedIn = isLoggedIn;
        state.user = user;
        state.token = token;
    },
    LOGOUT(state) {
        state.isAuthenticated = false;
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
    },
};

const actions = {
    async login({ commit }, user) {
        const { email, password } = user;
        try {
            const response = await api.post('/api/login', { email, password });
            const user = response.data.user;

            let isAuthor = false;
            if (user.role == 'manager') isAuthor = true;
            if (response.status == 201) {
                setToken(response.data.accessToken);
                setAuthorization(response.data.accessToken);

                console.log(isAuthor);
                commit('SET_AUTHENTICATION', {
                    isAuthenticated: isAuthor,
                    isLoggedIn: true,
                    user,
                    token: response.data.accessToken,
                });
            }
            console.log(user.role)
            return response;



        } catch (error) {
            return error;
        }
    },

    async register({ commit }, user) {
        const { fullname, email, birth, password, password_confirm, address, gender } = user;
        console.log(fullname, email, birth, password, password_confirm, address, gender);

        try {
            const response = await api.post('/api/register', { fullname, email, birth, password, password_confirm, address, gender });
            console.log(response.data);
            return response;

        } catch (error) {
            return error;
        }
    },

    async logout({ commit }) {
        try {
            localStorage.removeItem('accessToken');
            commit('LOGOUT');
            removeAuthorization();
            removeToken();
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
};

const getters = {
    isLoggedIn: (state) => !!state.token,
    isAuthenticated: (state) => state.user && state.user.role === 'manager',
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
});
