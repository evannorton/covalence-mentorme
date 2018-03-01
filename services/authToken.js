const AUTH_TOKEN_KEY = 'authtoken';
let authToken = '';

async function setAuthToken(token) {
    return await AsyncStorage.setItem(AUTH_TOKEN_KEY, `Bearer ${token}`);
}

async function clearAuthToken() {
    return await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}

async function getAuthToken() {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
}

export {
    setAuthToken,
    getAuthToken,
    clearAuthToken,
};