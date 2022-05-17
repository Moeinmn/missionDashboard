const launchesModel = require('./launches.mongo')


async function setLaunch(launchData) {
    // launchesMap.set(++missionNum, {
    //     ...data,
    //     missionNumber: missionNum
    // });
    let data = await launchesModel.find({}).sort('-missionNumber')
    let lastIndex = data[0].missionNumber;  
    await launchesModel.create({...launchData , missionNumber:lastIndex+1})
}

async function deleteLaunch(missionNumber) {
    // launchesMap.set(missionNumber, {
    //     ...launchesMap.get(missionNumber),
    //     upcoming: false
    // });
    await launchesModel.updateOne({missionNumber},{upcoming: false,success:false})
}

async function getAllLauchesDB() {
    let data = await launchesModel.find({}).sort('-missionNumber')
    return data
}

module.exports = {
    setLaunch,
    deleteLaunch,
    getAllLauchesDB
}