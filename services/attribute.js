import * as RestServices from './rest';

//Categories

async function getCategories() {
    return await RestServices.get('/api/categories');
}

let CategoryServices = {
    getCategories
}

//Subjects

async function getSubjects() {
    return await RestServices.get(`/api/subjects/`)
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

let SubjectServices = {
    getSubjects,
    getMentorSubjects,
    postMentorSubject,
    deleteMentorSubject
}

//Skills

async function getSkillByName(name) {
    return await RestServices.get(`/api/skills/names/${name}`);
}

async function postSkill(name) {
    return await RestServices.post(`/api/skills`, { name });
}

async function getMentorSkills(userid) {
    return await RestServices.get(`/api/skills/${userid}`);
}

async function postMentorSkill(userid, skillid) {
    await RestServices.post(`/api/mentorskills/`, {
        userid,
        skillid
    });
}

async function deleteMentorSkill(userid, skillid) {
    await RestServices.destroy(`/api/mentorskills/`, {
        userid,
        skillid
    });
}

let SkillServices = {
    getSkillByName,
    postSkill,
    getMentorSkills,
    postMentorSkill,
    deleteMentorSkill
}

export { CategoryServices, SubjectServices, SkillServices };