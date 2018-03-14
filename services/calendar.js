import * as RestServices from './rest';

async function getAvailability(userid) {
    return await RestServices.get(`/api/availability/${userid}`);
}

export { getAvailability }