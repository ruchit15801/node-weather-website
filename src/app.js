const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
 
const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve  
app.use(express.static(publicDirectorypath))


app.get('',(req, res) =>{
    res.render('index' ,{
        title:'Weather App',
        name:'Ruchit Lukhi'
    })
})

app.get('/about',(req, res) => {
    res.render('about' ,{
         title:'About Me',
         name:'Ruchit Lukhi'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helptext:'This Is Some Helpful text.',
        title:'Help page',
        name:'Ruchit Lukhi'
    })
})
 
app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error:'You must provide address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
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

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term!'
        })
    }
    res.send({
        products:[]
    })
})



app.get('/help/*',(req, res) =>{
    res.render('404',{
        title:'404',
        name:'Ruchit Lukhi',
        errorMessage:'Help artical not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Ruchit Lukhi',
        errorMessage:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
})