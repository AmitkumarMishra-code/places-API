const mongoose = require('mongoose')

const PlacesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
}, { timestamps: true })

const PlacesModel = mongoose.model('places', PlacesSchema)

module.exports = PlacesModel