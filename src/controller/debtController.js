
module.exports ={
    index(req, res) {
        const placa = req.body.placa
        console.log(placa)
        res.json(placa);
    }
}
