const mockDebts = require('../repository/fakeDebts');

function validateVehicleInfo(licensePlateQuery, carRegistry, location){
    const validation = [carRegistry, licensePlateQuery, location].some(item => item === undefined)
    if (validation) {
        return {message: "Não foi possível encontrar o seu veículo"}
    } 
    else {
        return findVehicleInfo(licensePlateQuery, carRegistry, location)
    }
};

function findVehicleInfo(licensePlateQuery, carRegistry, location) {
    const filteredLicensePlate = mockDebts.filter(carro => {
        const { placa, renavam, uf } = carro.result.veiculo;
        return placa == licensePlateQuery && renavam == carRegistry && uf == location;
    });
    return filteredLicensePlate
}

module.exports = {
    validateVehicleInfo,
    findVehicleInfo
}