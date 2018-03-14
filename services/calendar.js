import * as RestServices from './rest';

async function getAvailability(userid) {
    return await RestServices.get(`/api/availability/${userid}`);
}

async function deleteAvailability(id) {
    return await RestServices.destroy(`/api/availability/${id}`);
}

async function createAppointment(date, mentorid, studentid, subjectid, starttime, endtime) {
    return await RestServices.destroy('/api/appointment/');
}

export { getAvailability, deleteAvailability, createAppointment }