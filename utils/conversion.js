class Conversion {
  static weatherCodes = {
    100: "Clear",
    200: "Partial Clouds",
    300: "Cloudy",
    400: "Light Showers",
    500: "Heavy Showers",
    600: "Rain",
    700: "Snow",
    800: "Thunder"
  }
  static weatherCodeIcons = {
    100: "large orange sun outline icon right floated",
    200: "large light blue cloud sun icon right floated",
    300: "large grey cloud icon right floated",
    400: "large blue cloud sun rain icon right floated",
    500: "large grey cloud showers heavy icon right floated",
    600: "large purple cloud rain icon right floated",
    700: "large pink snowflake outline icon right floated",
    800: "large yellow bolt icon right floated"
  }

  static weatherIcon(code) {
    return Conversion.weatherCodeIcons[code];
  }


  static currentWeather(code) {
    return Conversion.weatherCodes[code];
  }

  static tempF(tempC) {
    return (tempC * 1.8) + 32;
  }

  static beaufort(windSpeed) {
    if (windSpeed <= 1) {
      return 0;
    } else if (windSpeed > 1 && windSpeed <= 5) {
      return 1;
    } else if (windSpeed >= 6 && windSpeed <= 11) {
      return 2;
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return 3;
    } else if (windSpeed >= 20 && windSpeed <= 28) {
      return 4;
    } else if (windSpeed >= 29 && windSpeed <= 38) {
      return 5;
    } else if (windSpeed >= 39 && windSpeed <= 49) {
      return 6;
    } else if (windSpeed >= 50 && windSpeed <= 61) {
      return 7;
    } else if (windSpeed >= 62 && windSpeed <= 74) {
      return 8;
    } else if (windSpeed >= 75 && windSpeed <= 88) {
      return 9;
    } else if (windSpeed >= 89 && windSpeed <= 102) {
      return 10;
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return 11;
    } else if (windSpeed > 117) {
      return 12;
    }
    return -1;
  }

  static degreesToCompass(deg) {
    if (deg > 11.25 && deg <= 33.75) {
      return "North North East";
    } else if (deg > 33.75 && deg <= 56.25) {
      return "North East";
    } else if (deg > 56.25 && deg <= 78.75) {
      return "East North East";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "East";
    } else if (deg > 101.25 && deg <= 123.75) {
      return "East South East";
    } else if (deg > 123.75 && deg <= 146.25) {
      return "South East";
    } else if (deg > 146.25 && deg <= 168.75) {
      return "South South East";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "South";
    } else if (deg > 191.25 && deg <= 213.75) {
      return "South South West";
    } else if (deg > 213.75 && deg <= 236.25) {
      return "South West";
    } else if (deg > 236.25 && deg <= 258.75) {
      return "West South West";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "West";
    } else if (deg > 281.25 && deg <= 303.75) {
      return "West North West";
    } else if (deg > 303.75 && deg <= 326.25) {
      return "North West";
    } else if (deg > 326.25 && deg <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  }
}

module.exports = Conversion;

