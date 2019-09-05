const request = require("request");

function forecast(lat,lon,callback){
    let url = "https://api.darksky.net/forecast/81cc8e4aee8ee0f1609407ed5fcbf0c1/"+encodeURIComponent(lat)+','+encodeURIComponent(lon)+
        '?units=si';
    request( {url:url,json:true}, (err,res)=>{
        if(err){
            callback('Unable to connect to location services',undefined);
        }else if(res.body.error){
            callback('Unable to find location',undefined);
        }else {
            callback(undefined, {
                summary:res.body.daily.data[0].summary,
                temperature:res.body.currently.temperature,
                probRain:res.body.currently.precipProbability
            })
        }
    });
}

module.exports = forecast;