const mongoose = require('mongoose');

let lauchesSchema = new mongoose.Schema({
    mission: {
        type: String,
        required: true
    },
    missionNumber:{
        type: Number,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    customers: {
        type: Array,
    },
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean    }
})

module.exports = mongoose.model('Launch', lauchesSchema)