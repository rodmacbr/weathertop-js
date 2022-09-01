"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const { nameSort } = require("../utils/utilities");
const uuid = require("uuid");
const axios = require("axios");
const Analytics = require("../utils/station-analytics");
const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=83ff0af6fde23d0746d6f45cb110b95c`

const dashboard = {
  index: function(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      name: "Weathertop Dashboard",
      stations: stationStore.getAllStations()
        .map(Analytics.updateWeather)
    };
    logger.info("about to render", stationStore.getAllStations());
    viewData.stations.sort(nameSort);
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: []
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
