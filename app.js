require('dotenv').config();
const { log } = require("console");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

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
        
        res.write("<h1>The temperature in "+ query +" is: " + temp + " degrees celcius</h1>");
        res.write("<p>The weather is currently " + description + "</p>");
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
        res.write("<img src = " + imageUrl + ">");
        res.send();
        });
    });


});




app.listen(3000, function(){
    console.log("Server is running");
})