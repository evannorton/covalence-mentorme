import * as RestServices from './rest';

async function getAvailability(userid) {
    return await RestServices.get(`/api/availability/${userid}`);
}

async function addException(id, exceptions) {
    return await RestServices.put(`/api/availability/${id}`, { exceptions });
}

async function getAppointments(usertype, userid, confirmed) {
    if (usertype === 'Mentor') {
        return await RestServices.get(`/api/appointments/mentors/${userid}/${confirmed}`);
    } else {
        return await RestServices.get(`/api/appointments/students/${userid}/${confirmed}`);
    }
}

async function createAppointment(date, mentorid, studentid, subjectid, hour) {
    return await RestServices.post('/api/appointments/', { date, mentorid, studentid, subjectid, hour });
}

export { getAvailability, addException, getAppointments, createAppointment }