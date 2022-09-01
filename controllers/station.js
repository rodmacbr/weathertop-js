"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const Analytics = require('../utils/station-analytics');
const axios = require("axios");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const viewData = {
      name: "Station",
      station: Analytics.updateWeather(stationStore.getStation(stationId)),
      latestReading: stationStore.getLatestReading(stationId)
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    // const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: parseFloat(request.body.code),
      temperature: parseFloat(request.body.temperature),
      windSpeed: parseFloat(request.body.windSpeed),
      windDirection: parseFloat(request.body.windDirection),
      pressure: parseFloat(request.body.pressure),
      date: new Date().toISOString()
    };

    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  async addReport(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);

    logger.info("rendering new report");
    let report = {};
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${station.lat}&lon=${station.lng}&units=metric&appid=83ff0af6fde23d0746d6f45cb110b95c`
    console.log(requestUrl);
    try {
      const result = await axios.get(requestUrl);

      if (result.status === 200) {
        const newReading = {
          id: uuid.v1(),
          code: result.data.cod,
          temperature: result.data.main.temp,
          windSpeed: result.data.wind.speed,
          windDirection: result.data.wind.deg,
          pressure: result.data.main.pressure,
          date: new Date(result.data.dt * 1000).toISOString()
        };

        stationStore.addReading(stationId, newReading);
      }
    } catch(e) {
      console.error('Weather request failed');
    }

    const updatedStation = stationStore.getStation(stationId);
    response.redirect(`/station/${updatedStation.id}`);
    // response.render("station", updatedStation);
  },
};

module.exports = station;
