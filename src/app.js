const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Defining paths for express handling
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')


// Setup handlebars engines and views 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('/about',(req, res)=>{
    res.render('about',{
        title:"About",
        name:"Created by Tanay"
    })
})

app.get('',(req, res)=>{
    res.render('index',{
        title:"Whether",
        name:"Created by Tanay"
    })
})
app.get('/whether',(req, res)=>{
    if (!req.query.address){
        return res.send({
            error: "Address not found."
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            else{res.send({
                forecast:forecastData,
                location:location
             })}
        })
})
    
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title:"Help",
        name:"Created by Tanay"
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:"Error 404 !!!",
        name:"Created by Tanay",
        errormessage:"Help article not found!"
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:"Error 404 !!!",
        name:"Created by Tanay",
        errormessage:"Page not found!"
        
    })
})


app.listen(port,()=>{
    console.log("Server started on port "+port)
})