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

const getSpecificPlace = async() => {

}

const listPlaces = async() => {
    try {
        let places = await Places.find()
        if (places.length) {
            return { status: true, message: places }
        } else {
            return { status: false, message: 'Places list is empty!' }
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