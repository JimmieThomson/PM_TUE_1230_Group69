const mongoose = require('mongoose');
const quoteSchema = new mongoose.Schema({
    speed: {type: Number},
    longtitude: {type: Number},
    latitude: {type: Number}
})
module.exports = mongoose.model('quotes', quoteSchema)