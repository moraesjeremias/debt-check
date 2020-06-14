const repository = require('../repository/debitsRepository')
const redis = require('redis');

const redisClient = redis.createClient();


module.exports = {

    getCarByRegion(req, res) {
        const {placa, renavam, auth_token, uf} = req.body
        const key = `placa:${placa}:renavam:${renavam}:uf:${uf}`
        redisClient.get(key, (err, reply) => {
            if (reply) {
                console.log("Request using redis")

                const debit = JSON.parse(reply)
                res.status(200).send(debit)
            } else {
                repository.getDebits(auth_token, placa, renavam, uf).then(response => {
                    console.log("Request using API")

                    redisClient.set(key, JSON.stringify(response.data));
                    redisClient.expire(key, process.env.TTL || 600);
                    res.status(200).json(response.data)
                }).catch(reason => {
                    res.json(reason)
                })
            }
        });

    },


    getCheckFederalAgencies(req, res) {
        const {placa, renavam, auth_token, orgao} = req.body
        const key = `placa:${placa}:renavam:${renavam}:orgao:${orgao}`
        redisClient.get(key, (err, reply) => {
            if (reply) {
                console.log("Request using redis")

                const debit = JSON.parse(reply)
                res.status(200).send(debit)
            } else {
                repository.getFederalAgencies(auth_token, placa, renavam, orgao).then(response => {
                    console.log("Request using API")

                    redisClient.set(key, JSON.stringify(response.data));
                    redisClient.expire(key, process.env.TTL || 600);
                    res.status(200).json(response.data)
                }).catch(reason => {
                    res.json(reason)
                })
            }
        });

    },

}




