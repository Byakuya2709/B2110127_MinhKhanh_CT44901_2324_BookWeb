
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
    SET_AUTHENTICATION(state, { isAuthenticated, user, token }) {
        state.isAuthenticated = isAuthenticated;
        state.isLoggedIn = state.isLoggedIn;
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
            const response = await api.post('/login', { email, password });
            const user = response.data.user;

            if (response.data.message == 'Successfull') {
                setToken(response.data.accessToken);
                setAuthorization(response.data.accessToken);
                commit('SET_AUTHENTICATION', {
                    isAuthenticated: true,
                    isLoggedIn: true,
                    user,
                    token: response.data.accessToken,
                });
            }

            return response;



        } catch (error) {
            console.log(error);
            return { message: 'Error', error };
        }
    },

    async register({ commit }, user) {
        const { fullname, email, birth, password, password_confirm, address, gender } = user;
        console.log(fullname, email, birth, password, password_confirm, address, gender);

        try {
            const response = await api.post('/register', { fullname, email, birth, password, password_confirm, address, gender });
            console.log(response.data);
            return response;

        } catch (error) {
            console.log(error)
            return { success: false, error };
        }
    },

    async logout({ commit }) {
        try {
            localStorage.removeItem('accessToken');
            commit('LOGOUT');
            removeAuthorization();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
};

const getters = {
    isLoggedIn: (state) => state.isLoggedIn,
    isAdmin: (state) => state.user && state.user.role === 'manager',
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
});
