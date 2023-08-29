import express from 'express';
import bodyParser from 'body-parser';
import OS from 'os';
import initializeDatabase from './src/database';

const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const axios = require('axios');

// Logger


console.log('Thread Pool Size => ' + OS.cpus().length);

//config
app.use(express.static('public'));
require('dotenv').config();

//Get env variables
const port = process.env.PORT || 8080;

//Middlewares
app.use(cors());
app.use(cookieParser());

/*parse application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: false }));

/*parse application/json*/
app.use(bodyParser.json());

initializeDatabase();

//Routes

app.listen(port, () => {
    console.log(`${port} port is listening...`);
});

