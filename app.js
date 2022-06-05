const express = require("express");
const app = express();
const port = 3000;
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const api = "c79a257fe246c8db6800a055be419c6d#";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    " &units=" +
    units +
    "&appid=" +
    api +
    "";
  console.log(url);

  https.get(url, function (response) {
    console.log(response.rain);
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const cityname = weatherdata.name;
      const temp = weatherdata.main.temp;
      const descrip = weatherdata.weather[0].description;
      const iconId = weatherdata.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
      res.write(
        "<h1>The temperature in " +
          cityname +
          " is actual " +
          temp +
          " Celsius <br>The weather is described as: " +
          descrip +
          ". <br>Have a Nice Day</h1>"
      );
      res.write("<img src=" + imgURL + ">");
      res.send();

      console.log(
        " The temperature in " +
          cityname +
          " is actual " +
          temp +
          " Celsius, the weather is described as: " +
          descrip +
          ". Have a Nice Day 😊"
      );
    });
  });
});

app.listen(port, () => {
  console.log(`WeatherApp listening on port ${port}`);
});
