const express = require("express");
const forecast = require("./utils/getForecast.js");
const path = require("path");
const app = express();
const hbs = require("hbs");

const publicDirPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Anni Aapro",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Anni Aapro",
    text: "Hello! It's me, Anni, and this is my weather app created with Node.js and Express. You can use this app to get current weather from all around the world!",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Anni Aapro",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please give an address.",
    });
  }
  forecast(req.query.address, (error, data) => {
    if (error) {
      console.log(error);
      return res.send({
        error: "Please give an address.",
      });
    } else {
      const { name, region, localtime } = data.location;

      const {
        temperature,
        observation_time,
        cloudcover,
        wind_speed,
        uv_index,
        feelslike,
      } = data.current;

      res.send({
        address: req.query.address,
        forecast: {
          name: name,
          region: region,
          localtime: localtime,
          temperature: temperature + " Celsius",
          observation_time: observation_time,
          feels_like: feelslike + " Celsius",
          cloud_cover: cloudcover + " %",
          wind_speed: parseFloat(wind_speed * 0.2778).toFixed(2) + " m/s",
          uv_index: uv_index,
        },
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("errorPage", {
    title: "Sorry!",
    text: "404 Page not found.",
    name: "Anni Aapro",
  });
});

app.listen(3000, () => {
  console.log("Server is up at port 3000.");
});