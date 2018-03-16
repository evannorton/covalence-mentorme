//calendar.js

import * as RestServices from './rest';

async function getAvailability(userid) {
    return await RestServices.get(`/api/availability/${userid}`);
}

async function addException(id, exceptions) {
    return await RestServices.put(`/api/availability/${id}`, { exceptions });
}

async function removeException(id, exceptions, exception) {
    exception = exception.substring(0, exception.length - 2);
    console.log(arguments);
    let index = exceptions.indexOf(exception);
    if (index === -1) {
        return;
    } else if (index === 0) {
        exceptions = exceptions.substring(exception.length + 1);
    } else {
        exceptions = exceptions.substring(0, index - 1) + exceptions.substring(index + exception.length);
    }
    console.log(exceptions);
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

async function confirmAppointment(id) {
    return await RestServices.put(`/api/appointments/${id}`, { confirmed: 1 });
}

async function deleteAppointment(id) {
    return await RestServices.destroy(`/api/appointments/${id}`);
}

export { getAvailability, addException, removeException, getAppointments, createAppointment, confirmAppointment, deleteAppointment };