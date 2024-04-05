import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export const api = axios.create({
    baseURL: 'http://localhost:3000/',
    ...commonConfig
});

export const setAuthorization = (token) => {
    api.defaults.headers.common['Authorization'] = token;
}

export const removeAuthorization = () => {
    delete api.defaults.headers.common['Authorization'];
}