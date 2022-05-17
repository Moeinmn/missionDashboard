const express = require('express');
const {
    httpGetAllLaunches,
    httpPostLaunch,
    httpDeleteLaunch,
} = require('./launches.controller');

let launchesRoute = express.Router();

launchesRoute.get('/launches', httpGetAllLaunches);
launchesRoute.post('/launches', httpPostLaunch)
launchesRoute.delete('/launches/:missionNumber', httpDeleteLaunch)

module.exports = launchesRoute
