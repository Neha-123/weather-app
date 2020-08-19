const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
//when u want to use reusable partials------------------
const hbs = require('hbs');

const app =  express();
const port = process.env.PORT || 3000;

//Display Dinamic pages or Views ---------------------------------
app.set('view engine', 'hbs');

//setup a custom View diretory (views folder is renamed as template)----------------------------
// const viewdirectorypath = path.join(__dirname, '../template');

//creating views folder under template folder and saving handlebar file there-------------------
const viewdirectorypath = path.join(__dirname, '../template/views');
//setup a custom partial diretory where u keep your partial files----------------------------
const partialdirectorypath = path.join(__dirname, '../template/partials');
hbs.registerPartials(partialdirectorypath);

app.set('views', viewdirectorypath);
app.get('', (req, res) => {
    res.render('', {
        name : 'Neha Singh',
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name : 'Neha Singh',
        title: 'About Me!'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg : 'May I help You!',
        title: 'Help',
        name:'Neha Singh'
    })
})

//Displaying Static content Method 2 -----------------------------
const homedirectorypath = path.join(__dirname, '../public');
app.use(express.static(homedirectorypath));




//Displaying Static content Method 1 -----------------------------
// app.get('', (req, res) => {
//     res.send('this is home Page!')
// })

// app.get('/help', (req, res) => {
//     res.send('this is HELP Page!')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>this is ABOUT Page!</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast : '35 deg',
//         location : 'India'
//     })
// })

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error : 'You must provide a search term!'
        })
    }
    res.send({
        products : []
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!req.query.address) {
        return res.send({
            error : 'Please provide an address'
        })
    }

    geocode(address, (error, {latitude, longitude, placename}={}) => {
        if (error) {
            return res.send({
                'Error' : error
            })
    
        } else {
            forecast(latitude, longitude, (errorforecast, {description, temperature, feelslike}) => {
                if (errorforecast) {
                    return res.send({
                        'Error' : errorforecast
                    })
    
                } else {

                    res.send({
                        forecast : description +', temperatue : '+temperature+', feelslike : '+feelslike,
                        location : placename,
                        address 
                    })
                }
            })
        }
    })

    
})



//displaying error messages ---------------------------

app.get('/help/*', (req, res) => {
    res.render('errorpage',{
        title:'Error Page',
        error : 'Help article not found!',
        name:'Neha Singh'
    })
})

app.get('*', (req, res) => {
    res.render('errorpage',{
        title:'Error Page',
        error : 'Page not found!',
        name:'Neha Singh'
    })
})


app.listen(port, ()=>{
    console.log('server is up at port '+ port)
})