const planetsModel = require('./planets.mongo');
const fs = require('fs');
const {
    parse
} = require('csv-parse');
const path = require('path');

let keplerData = [];

const isHabitable = (planet) => {
    return planet.koi_disposition === 'CONFIRMED' && planet.koi_insol > 0.36 && planet.koi_insol < 1.11
}

let getAllPlanetsFromModel = async () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', async (data) => {
                if (isHabitable(data)) {
                    keplerData.push(data);
                    await planetsModel.updateOne({
                        planet: data.kepler_name
                    }, {
                        planet: data.kepler_name
                    }, {
                        upsert: true
                    })
                }

            })
            .on('error', (err) => reject())
            .on('end', async () => {
                let DbData = await planetsModel.find({}, {
                    _id: 0,
                    __v: 0
                })
                resolve(DbData);
            })
    })
}

module.exports = {
    getAllPlanetsFromModel
}