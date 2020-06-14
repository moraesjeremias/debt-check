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

    getDebitsAndFederalAgencies(req, res) {
        const {placa, renavam, auth_token,uf} = req.body
        const key = `placa:${placa}:renavam:${renavam}:uf:${uf}`
        redisClient.get(key, (err, reply) => {
            if (reply) {
                console.log("Request using redis")
                const debit = JSON.parse(reply)
                res.status(200).send(debit)
            } else {
                repository.getDebitsAndFederalAgencies(auth_token, placa, renavam, uf).then(responses => {
                    console.log(responses)
                    console.log("Request using API")
                    let retorno = {}
                    console.log(responses.forEach(response => {
                        if (response.data){
                            console.log("__________DEBITO___________")
                            console.log(response.config.url)
                            retorno.debits = response.data
                            console.log(response.data)
                            console.log("_____________________")
                        }else{
                            response.forEach(agency =>{
                                console.log("__________ORGAO___________")
                                retorno.agency = agency.data
                                console.log(agency.data)
                                console.log("_____________________")
                            })
                        }
                    }))
                    res.status(200).json(retorno)
                }).catch(reason => {
                    res.json(reason)
                })
            }
        });
    },


    getCheckFederalAgencies(req, res) {
        const {placa, renavam, auth_token, agency} = req.body
        const key = `placa:${placa}:renavam:${renavam}:orgao:${agency}`
        redisClient.get(key, (err, reply) => {
            if (reply) {
                console.log("Request using redis")

                const debit = JSON.parse(reply)
                res.status(200).send(debit)
            } else {
                repository.getFederalAgencies(auth_token, placa, renavam, agency).then(response => {
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




