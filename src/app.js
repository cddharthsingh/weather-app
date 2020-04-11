const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publiDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views loacatio
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to use
app.use(express.static(publiDirectory))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Siddharth Singh'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Siddharth'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		message: 'Sorry, can not help. Fuck off',
		title: 'Help',
		name: 'Siddharth'
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.add){
		return res.send({
			Error: 'Location to daalo bhaiya.'
		})
	}
	forecast(req.query.add, (error, data) => {
		if(error){
			res.send(error)
		} 
		else {
			res.send({
				Location: data.location,
				Temp: data.temp,
				Summary: data.summary
				})
			}
		})
})

app.get('/help/*', (req,res) =>{
	res.render('404', {
		title: '404',
		message: 'Help page not found!',
		name: 'Siddharth'
	})
})

app.get('*', (req,res) =>{
	res.render('404', {
		title: '404',
		message: 'Page not found!',
		name: 'Siddharth'
	})
})

app.listen(port, () => {
	console.log('Server is up on port 3000.')
})