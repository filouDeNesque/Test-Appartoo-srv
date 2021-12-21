const express = require('express');
const app = express();
const api = require('./api/v1/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./api/v1/db'); //import pour test de connexion 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', (process.env.port || 3000));
app.use(cors());
app.use('/api/v1', api);//localhost:3000/api/v1

app.listen(app.get('port'), () => {
    console.log(`Express listen on port ${app.get('port')}`);

});