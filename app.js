const { response } = require('express');
const express = require('express')
const https = require('https');
const bodyParser = require('body-parser')
const { url } = require('inspector');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended :true}))


app.get('/' ,(req,res) =>{
        // res.send("The server is running")
        res.sendFile(__dirname + '/index.html')
})

app.post('/', (req,res) =>{
    const query = req.body.cityName;
    const apikey = '13ca0c89d8cd04873921fbc32a542965';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query +'&appid='+apikey+'&units=metric'
    https.get(url, (response) =>{
        // console.log(response.statusCode);
        response.on('data' ,(data) =>{
            // console.log(data.toString())
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            // console.log(temp);
            const description  = weatherData.weather[0].description;
            // console.log(description);
            res.write("<h1>The temperature in " +query+  " is " + temp + "degree celcius</h1>")
            res.write("The weather description is : "+ description )
        })

    })


    // console.log("The request is recieved");
    // console.log(req.body.cityName); 
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

