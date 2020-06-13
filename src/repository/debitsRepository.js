const integrationService = require("../integration/consultVehicleAPI");

module.exports = new class DebitsRepository {

   getDebits(token, licensePlate, carRegistry, uf) {
        return integrationService.getDebitsFromState(token, licensePlate, carRegistry, uf)
    }

}
