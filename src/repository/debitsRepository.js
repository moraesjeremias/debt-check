const integrationService = require("../integration/consultVehicleAPI");

module.exports = new class DebitsRepository {

    getDebits(token, licensePlate, carRegistry, uf) {
        return integrationService.getDebitsFromState(token, licensePlate, carRegistry, uf)
    }

    getFederalAgencies(token, licensePlate, carRegistry, agency) {
        return integrationService.getFederalAgenciesDebits(token, licensePlate, carRegistry, agency)
    }

   getDebitsAndFederalAgencies(token, licensePlate, carRegistry, uf) {
        const promises = [
            integrationService.getDebitsFromState(token, licensePlate, carRegistry, uf),
            integrationService.getDebitsAndFederalAgencies(token, licensePlate, carRegistry)
        ]
       return Promise.all(promises);
    }

}
