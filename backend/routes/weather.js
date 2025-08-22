const express = require('express');
const WeatherService = require('../services/weatherService');
const { validateWeatherRequest } = require('../middleware/validation');

const router = express.Router();
const weatherService = new WeatherService();

router.get('/:city', validateWeatherRequest, async (req, res) => {
  try {
    const { city } = req.params;
    const data = await weatherService.getWeatherData(city);
    res.json(data);
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
});

module.exports = router;
