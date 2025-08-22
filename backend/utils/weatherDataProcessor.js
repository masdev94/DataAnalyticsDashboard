const { TimezoneHelper } = require('./timezoneHelper');

class WeatherDataProcessor {
  constructor() {
    this.timezoneHelper = new TimezoneHelper();
    this.weatherDescriptions = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Foggy', 48: 'Depositing rime fog', 51: 'Light drizzle',
      53: 'Moderate drizzle', 55: 'Dense drizzle', 61: 'Slight rain',
      63: 'Moderate rain', 65: 'Heavy rain', 71: 'Slight snow fall',
      73: 'Moderate snow fall', 75: 'Heavy snow fall', 77: 'Snow grains',
      80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
      85: 'Slight snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm'
    };
  }

  processWeatherData(weatherData, cityName, countryName) {
    if (!weatherData.current) {
      throw new Error('Invalid weather data format');
    }

    const current = weatherData.current;
    const countryTimezone = this.timezoneHelper.getCountryTimezone(countryName);

    return {
      city: cityName,
      country: countryName,
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: Math.round(current.relative_humidity_2m),
      pressure: Math.round(current.pressure_msl),
      description: this.weatherDescriptions[current.weather_code] || 'Unknown',
      windSpeed: Math.round(current.wind_speed_10m),
      timestamp: new Date().toISOString(),
      timezone: countryTimezone,
      localTime: this.formatLocalTime(countryTimezone)
    };
  }

  createMockData(cityName) {
    const countryName = this.guessCountryFromCity(cityName);
    const countryTimezone = this.timezoneHelper.getCountryTimezone(countryName);

    return {
      city: cityName,
      country: countryName,
      temperature: Math.round(Math.random() * 30) + 10,
      feelsLike: Math.round(Math.random() * 30) + 10,
      humidity: Math.round(Math.random() * 40) + 40,
      pressure: Math.round(Math.random() * 200) + 1000,
      description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 5)],
      windSpeed: Math.round(Math.random() * 20) + 5,
      timestamp: new Date().toISOString(),
      timezone: countryTimezone,
      localTime: this.formatLocalTime(countryTimezone)
    };
  }

  formatLocalTime(timezone) {
    return new Date().toLocaleString('en-US', { 
      timeZone: timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });
  }

  guessCountryFromCity(cityName) {
    const cityLower = cityName.toLowerCase();
    
    if (cityLower.includes('belgrade')) return 'Serbia';
    if (cityLower.includes('london')) return 'United Kingdom';
    if (cityLower.includes('new york')) return 'United States';
    if (cityLower.includes('paris')) return 'France';
    if (cityLower.includes('berlin')) return 'Germany';
    
    return 'Unknown';
  }
}

module.exports = { WeatherDataProcessor };
