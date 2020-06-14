const axios = require('axios');
const querystring = require('querystring');

const debtApi = axios.create({
    baseURL: "https://api.consultasdeveiculos.com"
})

// Chamada na API de Consulta Veículos, retorna uma promise
async function getDebitsFromState(token, licensePlate, carRegistry, uf) {
    const debtFormData = querystring.stringify({
        auth_token: token,
        placa: licensePlate,
        renavam: carRegistry
    });

    const headers = {
        'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
    };

    return await debtApi.post('/debitos/' + uf, debtFormData, headers)
}


async function getFederalAgenciesDebits(token, licensePlate, carRegistry, agency) {
    const debtFormData = querystring.stringify({
        auth_token: token,
        placa: licensePlate,
        renavam: carRegistry
    });

    const headers = {
        'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
    };

    return await debtApi.post('/orgaos/' + agency, debtFormData, headers)
}

async function getDebitsAndFederalAgencies(token, licensePlate, carRegistry) {
    const debtFormData = querystring.stringify({
        auth_token: token,
        placa: licensePlate,
        renavam: carRegistry
    });

    const headers = {
        'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
    };
    let agencies = [];
    agencies.push(await debtApi.post('/orgaos/der', debtFormData, headers))
    agencies.push(await debtApi.post('/orgaos/dnit', debtFormData, headers))
    agencies.push(await debtApi.post('/orgaos/prf', debtFormData, headers))
    return agencies
}


module.exports = {getDebitsFromState, getFederalAgenciesDebits, getDebitsAndFederalAgencies}


