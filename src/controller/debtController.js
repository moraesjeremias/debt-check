const fakeDebts = require('../service/getVehicleInfo')
const redis = require('redis');

const debtsClient = redis.createClient();


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

    chachedDebtsFromRedis(request, response) {
        const { placa, renavam, auth_token, uf } = request.body;
        debtsClient.get(`placa:${placa}:renavam:${renavam}:uf:${uf}`, (err, reply) => {
            if(reply != null){
                try {
                    const jsonParsedRedisReply = JSON.parse(reply)
                    console.log('\n Retorno da Consulta no Redis: \n', jsonParsedRedisReply)
                    return response.json(jsonParsedRedisReply)
                } catch (error) {
                    console.log(err)
                    return err
                }
            }else{
                const databaseDebts = fakeDebts.validateVehicleInfo(placa,renavam, uf)
                const stringParsedDbDebts = JSON.stringify(databaseDebts);
                console.log('\n Retorno da Consulta no Mock: \n', databaseDebts);
                debtsClient.setex(`placa:${placa}:renavam:${renavam}:uf:${uf}`, process.env.TTL || 5, stringParsedDbDebts)
                return response.json(databaseDebts) 
            }  
        })
    },

}
