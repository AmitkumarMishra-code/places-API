const mongoose = require('mongoose')

const Places = require('../models/places')

const addPlaces = async({ name, state, city }) => {
    let slug = name.split(' ').join('-') + '-' + Date.now()
    console.log(slug)
    let newPlace = new Places({ name, slug, city, state });
    try {
        await newPlace.save()
        return { status: true, message: name + ' added successfully to the database' }
    } catch (error) {
        return { status: false, message: error.message }
    }
}

const getSpecificPlace = async(slug) => {
    try {
        let place = await Places.findOne({ slug })
        if (place) {
            return { status: true, message: place }
        } else {
            return { status: false, message: 'No matching result found!' }
        }
    } catch (error) {
        return { status: false, message: error.message }
    }
}

const listPlaces = async(name, city) => {
    let places = [];
    try {
        if (name.length) {
            places = await Places.find({ name: { "$regex": name } })
        } else if (city.length) {
            places = await Places.find({ city: { "$regex": city } })
        } else {
            places = await Places.find()
        }
        if (places.length) {
            return { status: true, message: places }
        } else {
            return { status: false, message: 'Places list is empty or no matching places found for provided query!' }
        }
    } catch (error) {
        return { status: false, message: error.message }
    }
}


module.exports = {
    addPlaces,
    getSpecificPlace,
    listPlaces
}