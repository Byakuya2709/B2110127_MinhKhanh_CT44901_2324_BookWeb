export const setToken = (token) => {
    return localStorage.setItem('tokenUser', token);
}

export const getToken = () => {
    return localStorage.getItem('tokenUser') || '';
}

export const removeToken = () => {
    return localStorage.removeItem('tokenUser');
}