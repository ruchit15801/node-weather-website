const request = require('postman-request')


const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d8ee970294918142ae16bd40d8cc056e&query='+ address
   
      request({url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if ( body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude:  body.location['lat'],
                longitude:  body.location['lon'],
                location:  body.location['name']
            })
        }
    })
}


module.exports = geocode