import RestServices from './rest';

async function getAvailabilities(userid) {
    await RestServices.get(`/api/availabilities/${userid}`);
}

export { getAvailabilities }