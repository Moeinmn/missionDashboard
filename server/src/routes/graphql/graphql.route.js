const express = require('express');
const {buildSchema} = require('graphql')
const { graphqlHTTP } = require('express-graphql');

const launchesModel = require('../../models/launches.mongo')
const planetsModel = require('../../models/planets.mongo')

const gqlRouter = express.Router();

const schema = buildSchema(`
type Query {
    planets:[Planet]
    launches:[Launch]
}
type Planet{
    name:String!
}
type Launch{
    mission: String!
    launchDate: String!
    missionNumber: Int!
    rocket: String!
    success: Boolean
    upcoming: Boolean
}
`);

const root = {
    planets:async()=>{
        let planetsDbArray = await planetsModel.find({},{planet:1});

        return Array.from(planetsDbArray,(planet)=>{return {name:planet.planet}})
    },
    launches:async()=>{
        let launchesDbArray = await launchesModel.find({});

        return Array.from(launchesDbArray,(launch)=>{
        return {
            mission:launch.mission,
            launchDate: launch.launchDate.toString(),
            missionNumber:launch.missionNumber,
            rocket:launch.rocket,
            success:launch.success,
            upcoming:launch.upcoming
        }
    })
    }
}

gqlRouter.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true   
}))

module.exports=gqlRouter