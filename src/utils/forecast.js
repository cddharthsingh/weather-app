const request = require('request')

const forecast = (address, callback) => {
	const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(address) + '&APPID=3b34bd1b990a165d063bf6a16536fe2c&units=metric'
	request({url: url, json:true}, (error, response) => {
		if(error){
			callback('Unable to connect to internet!!', undefined)
		} else if(response.body.message){
			callback('Location not found', undefined)
		} else {
			callback(undefined, {
				temp: response.body.main.temp,
				location: response.body.name,
				summary: response.body.weather[0].description
			})
		}
	})
}

module.exports = forecast