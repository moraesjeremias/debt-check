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


async function getFederalAgenciesDebits(token, licensePlate, carRegistry, orgao) {
    const debtFormData = querystring.stringify({
        auth_token: token,
        placa: licensePlate,
        renavam: carRegistry
    });

    const headers = {
        'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
    };

    return await debtApi.post('/orgaos/' + orgao, debtFormData, headers)
}


module.exports = {getDebitsFromState, getFederalAgenciesDebits}


