export const setToken = (token) => {
    return localStorage.setItem('tokenManager', token);
}

export const getToken = () => {
    return localStorage.getItem('tokenManager') || '';
}

export const removeToken = () => {
    return localStorage.removeItem('tokenManager');
}