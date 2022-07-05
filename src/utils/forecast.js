const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d8ee970294918142ae16bd40d8cc056e&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, 'json': true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect the Weather Server!', undefined);
        } else if ( body.error) {
            callback('Unable to find weather for this location', undefined);
        } else {
            callback(undefined, body.location['name'] + ' It is currently ' + body.current["temperature"] + ' degress out. but it is a  feelslike ' + body.current["feelslike"] + ' And local time is ' + body.location['localtime']
               
            )
        }
    })
    }
    
    module.exports = forecast
