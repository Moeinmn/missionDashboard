const { getAllPlanetsFromModel } = require("../../models/planets.model")

function httpGetAllPlanets (req , res){
    (
        async function() {
            let data = await getAllPlanetsFromModel();
            return res.status(200).json(data)
        }
    )();
    
}


module.exports={
    httpGetAllPlanets
}