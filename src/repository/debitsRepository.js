const integrationService = require("../integration/consultVehicleAPI");

module.exports = new class DebitsRepository {

   getDebits(token, licensePlate, carRegistry, uf) {
        return integrationService.getDebitsFromState(token, licensePlate, carRegistry, uf)
    }

    getFederalAgencies(token, licensePlate, carRegistry, orgao) {
        return integrationService.getFederalAgenciesDebits(token, licensePlate, carRegistry, orgao)
    }

}
