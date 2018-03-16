import * as RestServices from './rest';

async function makePayment(mentorid, studentid, amount) {
    console.log(arguments);
    return await RestServices.post('/api/payments', { studentid, mentorid, amount });
}

export { makePayment };