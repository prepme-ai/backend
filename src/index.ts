import express from 'express';
import bodyParser from 'body-parser';
import OS from 'os';
import { initDBAdmins } from './database';
import user from './routes/user.routes';
import routeGenerator from './utils/routeGenerator';
import { Routes } from './types/route.types';

import cors from 'cors';
import cookieParser from 'cookie-parser';
// import axios from 'axios';
import { config } from 'dotenv';
const app = express();

console.log('Thread Pool Size => ' + OS.cpus().length);

//config
app.use(express.static('public'));
config();

//Get env variables
const port = process.env.PORT || 8080;

//Middlewares
app.use(cors());
app.use(cookieParser());

/*parse application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: false }));

/*parse application/json*/
app.use(bodyParser.json());

initDBAdmins();

//Routes
app.use(...routeGenerator(Routes.USER, user));
app.get('/', (req, res) => {
  res.send('You made it you moron!');
});

app.listen(port, () => {
  console.log(`${port} port is listening...`);
});
