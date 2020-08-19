
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const address = process.argv[2];

//  console.log(process.argv);

if(!address) {
    console.log('Enter address!')
} else {
    geocode(address, (error, {latitude, longitude, placename}={}) => {
        if (error) {
            return console.log('Error', error);
    
        } else {
            forecast(latitude, longitude, (errorforecast, {description, temperature, feelslike}) => {
                if (errorforecast) {
                    return console.log('Error', errorforecast);
    
                } else {
                    console.log('Place Name: ', placename);
                    console.log('Weather description: ', description);
                    console.log('Weather temperature: ', temperature);
                    console.log('Weather feelslike: ', feelslike);
                }
            })
        }
    })
}

