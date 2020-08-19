const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=79840514abad42a06484005fa9bd6808&%20query='+lat+','+long;
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to forecast service!!', undefined);
        } else if(body.error) {
            callback('Incorrect coordinates!!', undefined);
        } else {
            const data = body.current;
            callback(undefined, {
                description : data.weather_descriptions[0],
                temperature: data.temperature,
                feelslike: data.feelslike
            })
        }
        
    })
}

module.exports = forecast;