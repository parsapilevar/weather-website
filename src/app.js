const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Pil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about us',
        name: 'Pil'
    })
})

app.get('/help' , (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Pil',
        helpText: 'You are in help page!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'address must be provide!'
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast (latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
       
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'search term not provided'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    // res.send('Help article not found!')
    res.render('404', {
        errorMassage: 'Help article not found!', 
        title: '404',
        name: 'Pil'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMassage: 'Page not found!',
        title: '404',
        name: 'Pil'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})