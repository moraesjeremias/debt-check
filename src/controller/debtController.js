const fakeDebts = require('../service/getVehicleInfo')


module.exports ={
    index(req, res) {
        const placa = req.body.placa
        console.log(placa)
        res.json(placa);
    },

    retrieveQueriedDebt(req, res) {
        const { placa, renavam, uf } = req.body
        console.log(placa, renavam, uf)
        try {
            const queriedDebtResult = fakeDebts.validateVehicleInfo(placa, renavam, uf)
            return res.json(queriedDebtResult)
        } catch (error) {
            console.log(error)
            return res.json(error)
        }
    },

    
}
