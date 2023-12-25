require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response){
        response.on("data", function(data){
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
        res.render('data', { query: query, temp: temp, description: description, imageUrl: imageUrl });
        });
    });
});

app.listen(3000, function(){
    console.log("Server is running");
});