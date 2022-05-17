const axios = require('axios');
const launchesModel = require('../models/launches.mongo')

async function loadSpaceXData() {
    try {
        let req = await axios.post('https://api.spacexdata.com/v4/launches/query', {
            "query": {},
            "options": {
                "populate": [{
                        "path": "rocket",
                        "select": {
                            "name": 1
                        }
                    },
                    {
                        "path": "payloads",
                        "select": {
                            "customers": 1
                        }
                    }
                ],
                "pagination": false
            }
        })
        return req?.data?.docs
    } catch (error) {
        return error
    }
}
async function writeSpaceXDataToDB() {
    const spaceXData = await loadSpaceXData();
    // querying db before mapping data to db
    //and checking if data is already available in db or not
    if (await launchesModel.findOne({mission:spaceXData[spaceXData.length-1]['name']})) return;
    
    //adding launches to db
    let data = await launchesModel.find({}).sort('-missionNumber')
    let lastIndex = (await data[0]?.missionNumber ? data[0].missionNumber : 0);

    spaceXData.map(async (launch) => {
        let missionNumber = lastIndex++;
        console.log(missionNumber);
        const customers = launch.payloads.flatMap((payload) => payload.customers)
        await launchesModel.updateOne({
            mission: launch.name
        }, {
            mission: launch.name,
            rocket: launch.rocket.name,
            launchDate: launch.date_local,
            destination: ' ',
            customers: customers,
            upcoming: launch.upcoming,
            success: (launch.success ? true : false),
            missionNumber: missionNumber
        },{
            upsert:true
        })
    })
}
module.exports = writeSpaceXDataToDB