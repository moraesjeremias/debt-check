const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');




const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.get('/', (request, response) => {
    response.json('Server Running at: ' + port)
})

const port = process.env.PORT || 4003
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});
