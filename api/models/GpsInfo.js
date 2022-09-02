const mongoose = require('mongoose');
const gpsInfoSchema = new mongoose.Schema({
    speed: {
        type: Number, 
        required: true
    },
    longtitude: {
        type: Number, 
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('gpsinfo', gpsInfoSchema)