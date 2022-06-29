const request = require("postman-request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e9011528febfeebbf2215aba094dd686&query=" +
    encodeURIComponent(address) +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Yhteyden muodostus palvelimeen epäonnistui.", undefined);
      return;
    } else if (body.error) {
      callback(body.error.info, undefined);
      return;
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forecast;
