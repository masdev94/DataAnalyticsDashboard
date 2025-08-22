const axios = require('axios');

class WeatherService {
  constructor() {
    this.baseUrl = process.env.OPEN_METEO_BASE_URL || 'https://api.open-meteo.com/v1';
    this.geocodingUrl = process.env.OPEN_METEO_GEOCODING_URL || 'https://geocoding-api.open-meteo.com/v1';
    this.apiTimeout = parseInt(process.env.API_TIMEOUT || '10000');
  }

  async getWeatherData(city) {
    try {
      const coordinates = await this.getCoordinates(city);
      
      if (!coordinates) {
        throw new Error('City not found');
      }

      const weatherResponse = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code',
          timezone: coordinates.timezone || 'auto'
        },
        timeout: this.apiTimeout
      });

      return this.processWeatherData(weatherResponse.data, city, coordinates);
    } catch (error) {
      console.error('Weather service error:', error.message);
      return this.getMockWeatherData(city);
    }
  }

  async getCoordinates(city) {
    try {
      const response = await axios.get(`${this.geocodingUrl}/search`, {
        params: {
          name: city,
          count: 1,
          language: 'en',
          format: 'json'
        },
        timeout: this.apiTimeout
      });

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        return {
          latitude: result.latitude,
          longitude: result.longitude,
          timezone: result.timezone,
          country: result.country
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error.message);
      return null;
    }
  }

  processWeatherData(data, city, coordinates) {
    const current = data.current;
    
    return {
      city: city,
      country: coordinates.country || 'Unknown',
      timezone: coordinates.timezone || 'UTC',
      timestamp: new Date().toISOString(),
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      pressure: current.pressure_msl,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      description: this.getWeatherDescription(current.weather_code)
    };
  }

  getWeatherDescription(code) {
    const weatherCodes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      95: 'Thunderstorm'
    };
    return weatherCodes[code] || 'Unknown';
  }

  getMockWeatherData(city) {
    const cityParts = city.split(',');
    const cityName = cityParts[0].trim();
    const countryName = cityParts.length > 1 ? cityParts[1].trim() : 'Demo';
    
    return {
      city: cityName,
      country: countryName,
      timezone: 'UTC',
      timestamp: new Date().toISOString(),
      temperature: Math.floor(Math.random() * 30) + 10,
      feelsLike: Math.floor(Math.random() * 30) + 10,
      humidity: Math.floor(Math.random() * 40) + 40,
      pressure: Math.floor(Math.random() * 200) + 1000,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      weatherCode: Math.floor(Math.random() * 3),
      description: 'Partly cloudy'
    };
  }
}

module.exports = WeatherService;
