const Conversion = require("./conversion");

class Analytics {
  static updateWeather(station) {
    if (station.readings.length > 0) {
      const lastReading = station.readings[station.readings.length - 1];
      station.code = lastReading.code;
      station.weather = Conversion.currentWeather(lastReading.code);
      station.weatherIcon = Conversion.weatherIcon(lastReading.code);

      station.tempC = lastReading.temperature;
      station.tempF = Conversion.tempF(lastReading.temperature);
      station.maxTemp = Analytics.maxTemp(station.readings);
      station.minTemp = Analytics.minTemp(station.readings);
      const tempTrend = Analytics.tempTrend(station.readings);
      station.tempTrendingUp = tempTrend > 0;
      station.tempTrendingDown = tempTrend < 0;

      station.windBft = Conversion.beaufort(lastReading.windSpeed);
      station.maxWind = Analytics.maxWind(station.readings);
      station.minWind = Analytics.minWind(station.readings);
      const windTrend = Analytics.windTrend(station.readings);
      station.windChill = Analytics.windChill(lastReading.temperature, lastReading.windSpeed).toFixed(2);
      station.windCompass = Conversion.degreesToCompass(lastReading.windDirection);
      station.windTrendingUp = windTrend > 0;
      station.windTrendingDown = windTrend < 0;

      station.pressure = lastReading.pressure;
      station.maxPressure = Analytics.maxPressure(station.readings);
      station.minPressure = Analytics.minPressure(station.readings);
      const pressureTrend = Analytics.pressureTrend(station.readings);
      station.pressureTrendingUp = pressureTrend > 0;
      station.pressureTrendingDown = pressureTrend < 0;
    }
    return station;
  }

  static windChill(temp, windSpeed) {
    return 13.12 + 0.6215 * temp - 11.37 * (Math.pow(windSpeed, 0.16)) + 0.3965 * temp * (Math.pow(windSpeed, 0.16));
  }

  static maxTemp(readings) {
    return Math.max.apply(null, readings.map((reading) => reading.temperature));
  }



  static minTemp(readings) {
    return Math.min.apply(null, readings.map((reading) => reading.temperature));
  }

  static maxWind(readings) {
    return Math.max.apply(null, readings.map((reading) => reading.windSpeed));
  }

  static minWind(readings) {
    return Math.min.apply(null, readings.map((reading) => reading.windSpeed));
  }

  static maxPressure(readings) {
    return Math.max.apply(null, readings.map((reading) => reading.pressure));
  }

  static minPressure(readings) {
    return Math.min.apply(null, readings.map((reading) => reading.pressure));
  }

  static tempTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      const values = [
        readings[readings.length - 3].temperature,
        readings[readings.length - 2].temperature,
        readings[readings.length - 1].temperature
      ];
      trend = Analytics.calcTrend(values);
    }
    return trend;
  }

  static windTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      const values = [
        readings[readings.length - 3].windSpeed,
        readings[readings.length - 2].windSpeed,
        readings[readings.length - 1].windSpeed
      ];
      trend = Analytics.calcTrend(values);
    }
    return trend;
  }

  static pressureTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      const values = [
        readings[readings.length - 3].pressure,
        readings[readings.length - 2].pressure,
        readings[readings.length - 1].pressure
      ];
      trend = Analytics.calcTrend(values);
    }
    return trend;
  }

  static calcTrend(values) {
    let trend = 0;
    if (values.length > 2) {
      if ((values[2] > values[1]) && (values[1] > values[0])) {
        trend = 1;
      } else if ((values[2] < values[1]) && (values[1] < values[0])) {
        trend = -1;
      }
    }
    return trend;
  }
}

module.exports = Analytics;