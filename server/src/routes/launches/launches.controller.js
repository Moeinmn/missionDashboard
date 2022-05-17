const { setLaunch , deleteLaunch ,getAllLauchesDB} = require("../../models/launches.model")


async function httpGetAllLaunches(req, res) {
    let data = await getAllLauchesDB()
    return res.status(200).json(data)
}

async function httpPostLaunch(req, res) {
    let recievedData = req.body;    
    await setLaunch({...recievedData , upcoming:true});
    return res.status(201).json({message:'Mission successfully created'});
}

async function httpDeleteLaunch(req, res) {
    let missionNumber = Number(req.params.missionNumber);
    await deleteLaunch(missionNumber)
    return res.status(200).json({message:`Mission number ${missionNumber} was successfully aborted`})

}

module.exports = {
    httpGetAllLaunches,
    httpPostLaunch,
    httpDeleteLaunch
}