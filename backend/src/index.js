import cors from "cors"
import express from "express"
const ApiError = require('./utils/ApiError');
const mongoose = require('mongoose');
const config = require('./configs/config');
const routes = require('./routes/');
const httpStatus = require('http-status');
let server;


const app = express()

app.use(cors());
app.options('*', cors());

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log('Connected to MongoDB');

});



app.use(express.json());


app.use(routes);
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });
  

server = app.listen(config.port, () => {
console.log(`Server Listening on ${config.port}!`)
});