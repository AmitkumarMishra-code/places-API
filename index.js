const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { addPlaces, listPlaces } = require('./controllers/placesController')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://127.0.0.1:27017/places', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.get('/places', async(req, res) => {
    let response = await listPlaces()
    if (response.status) {
        res.status(200).send(response.message)
    } else {
        res.status(400).send(response.message)
    }
})

app.post('/places', async(req, res) => {
    console.log(req.body)
    if (!req.body.name || !req.body.state || !req.body.city) {
        res.status(401).send('Invalid Data! Please provide all data to add a place!')
    } else {
        let response = await addPlaces(req.body)
        if (response.status) {
            res.status(200).send(response.message)
        } else {
            res.status(400).send(response.message)
        }
    }
})

app.all(/.*/, (req, res) => {
    res.statusCode = (404)
    res.send('Error 404. Endpoint not found! Contact Admin!')
})

const PORT = 4000
app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})