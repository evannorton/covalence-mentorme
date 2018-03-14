import * as baseService from './base';

function postCharge(token) {
    baseService.makeFetch('/api/donate', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json();
            }
        })
        .catch((error) => {
            throw error;
        });
}

export { postCharge };