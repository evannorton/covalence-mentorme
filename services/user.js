import * as RestServices from './rest';
import * as AuthServices from './authToken';

async function isLoggedIn() {
    return checkLogin();
}

async function checkLogin() {
    await RestServices.getAuthToken();

    try {
        const user = await me();

        if (!user) {
            return false;
        }

        return true;
    } catch (e) {
        return false;
    }
}

async function login(email, password, usertype) {
    await logout();
    const response = await RestServices.post('/api/auth/login', {
        email,
        password,
        usertype
    });
    await AuthServices.setAuthToken(response.token);
}

async function logout() {
    console.log('in the logout function');
    await AuthServices.clearAuthToken();
}

async function signup(name, email, password, usertype) {
    await RestServices.post('/api/users', {
        name,
        email,
        password,
        usertype
    });
}

async function getMe(email, usertype) {
    return RestServices.get('/api/users/me');
}

export { isLoggedIn, checkLogin, login, logout, signup, getMe };
