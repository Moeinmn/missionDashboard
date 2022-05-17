const express = require('express');
const { httpGetAllPlanets } = require('./planets.controller');

const planetsRoute = express.Router();

planetsRoute.get('/planets' , httpGetAllPlanets)

module.exports= planetsRoute;