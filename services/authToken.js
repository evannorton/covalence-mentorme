const AUTH_TOKEN_KEY = 'authtoken';
let authToken = '';

function setAuthToken(token) {
    authToken = `Bearer ${token}`;
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken);
    } catch (err) {
        console.log(err)
    }
}

function clearAuthToken() {
    authToken = '';
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (err) {
        console.log(err);
    }

}

function populateAuthToken() {
    let token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token && token !== null) {
        authToken = token;
    }
}

export {
    setAuthToken,
    populateAuthToken,
    clearAuthToken,
};