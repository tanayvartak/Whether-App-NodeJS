const request = require('request')

const forecast = (latitude,longitude,callback )=> {
    const url ='http://api.weatherstack.com/current?access_key=d367f63fbbb4210278bc246ce34ad92a&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body}) => {
    if(error){
        callback('Unable to connect !!!',undefined)
    }
    else if(body.error){
       callback('Unable to find the location!!!',undefined)
    }
    else{
       callback(undefined, body.current.weather_descriptions[0]+' It is currently '+body.current.temperature+' degrees out there. It feels is like '+body.current.feelslike+' degrees out')
    }
    
})
}

module.exports=forecast