const express = require('express');
const cors = require('cors')
const path = require('path')

const planetsRoute = require('./routes/planets/planets.route');
const launchesRoute = require('./routes/launches/launches.route');

const app = express();


app.use(cors())
app.use(express.json())
app.use(planetsRoute);
app.use(launchesRoute);
app.use(express.static(path.join(__dirname , '..' , '..' ,'client','build')))
app.get('/*' ,(req , res)=>{
    res.sendFile(path.join(__dirname , '..' , '..' ,'client','build', 'index.html'))
})

module.exports={
    app
}