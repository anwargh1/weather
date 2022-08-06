const express = require("express");
const router = express.Router();
const axios = require("axios");

const City = require("../model/City");

router.get("/city/:cityName", function (req, res) {
  const cityName = req.params.cityName;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=570d82677ae75036c7a1a2ce182b084d`
    )
    .then(function (city) {
      res.send(city.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/cities", function (req, res) {
  City.find({}, function (err, data) {
    res.send(data);
  });
});

router.post("/city", function (req, res) {
  const city = req.body
  const c = new City({
    name: city.name,
    temperature: city.temperature,
    condition: city.condition,
    conditionPic: city.conditionPic,
  });
  c.save();
  res.end();
});

router.delete("/city/:cityName", function (req, res) {
  const cityName = req.params.cityName;
  City.find({ name: cityName }, function (err, city) {
    city.forEach((c) => {
      c.remove();
    });
  });
  res.end();
});

module.exports = router;
