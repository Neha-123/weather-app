const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmVoYTEwMTIiLCJhIjoiY2tkb25xajRtMG1yMDJ3dHZqZTU5dXNiYyJ9.FQUeOd2Q7zawLEVcmINvKQ&limit=1';
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to mapbox service!!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find the location!!', undefined);
        } else {
            const data = body;
            const coordinates = data.features[0].center;
            const placename = data.features[0].place_name;
            callback(undefined,{
                placename,
                longitude : coordinates[0],
                latitude : coordinates[1]
            });
        }
    })
}

module.exports = geocode;