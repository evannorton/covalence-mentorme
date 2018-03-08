import * as AuthServices from './authToken';
import * as RestServices from './rest';

async function isLoggedIn() {
    return checkLogin();
}

async function checkLogin() {
    await AuthServices.getAuthToken();

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

async function getMe() {
    return RestServices.get('/api/users/me');
}

async function getMentorSubjects(userid) {
    return await RestServices.get(`/api/subjects/users/${userid}`);
}

async function postMentorSubject(userid, subjectid) {
    await RestServices.post(`/api/mentorsubjects/`, {
        userid,
        subjectid
    });
}

async function deleteMentorSubject(userid, subjectid) {
    await RestServices.destroy(`/api/mentorsubjects/`, {
        userid,
        subjectid
    });
}

async function getSubjects() {
    return await RestServices.get(`/api/subjects/`)
}

async function getMentorSkills(userid) {
    return await RestServices.get(`/api/skills/${userid}`);
}

async function deleteMentorSkill(userid, skillid) {
    await RestServices.destroy(`/api/mentorskills/`, {
        userid,
        skillid
    });
}

async function getCategories() {
    return await RestServices.get('/api/categories');
}

export { isLoggedIn, checkLogin, login, logout, signup, getMe, getMentorSkills, getMentorSubjects, getSubjects, getCategories, postMentorSubject, deleteMentorSubject, deleteMentorSkill };
