const mongoose = require('mongoose');

let planetsSchema = new mongoose.Schema({
    planet: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Planet', planetsSchema)