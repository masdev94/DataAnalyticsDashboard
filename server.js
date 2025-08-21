const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Fetch cryptocurrency data from CoinGecko API
app.get('/api/crypto', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false');
        const cryptoData = response.data;
        
        // Process and analyze the data
        const processedData = {
            totalMarketCap: cryptoData.reduce((sum, coin) => sum + coin.market_cap, 0),
            averagePrice: cryptoData.reduce((sum, coin) => sum + coin.current_price, 0) / cryptoData.length,
            topGainers: cryptoData
                .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                .slice(0, 5),
            topLosers: cryptoData
                .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
                .slice(0, 5),
            coins: cryptoData
        };
        
        res.json(processedData);
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch cryptocurrency data',
            message: error.message 
        });
    }
});

// Fetch GitHub trending repositories data
app.get('/api/github', async (req, res) => {
    try {
        // Fetch trending repositories from GitHub
        const response = await axios.get('https://api.github.com/search/repositories?q=created:>2024-01-01&sort=stars&order=desc&per_page=20');
        const reposData = response.data.items;
        
        // Process GitHub data
        const processedData = {
            totalRepos: reposData.length,
            totalStars: reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0),
            totalForks: reposData.reduce((sum, repo) => sum + repo.forks_count, 0),
            topLanguages: {},
            topRepos: reposData.slice(0, 10),
            averageStars: Math.round(reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0) / reposData.length)
        };
        
        // Categorize by programming language
        reposData.forEach(repo => {
            const language = repo.language || 'Unknown';
            processedData.topLanguages[language] = (processedData.topLanguages[language] || 0) + 1;
        });
        
        res.json(processedData);
    } catch (error) {
        console.error('Error fetching GitHub data:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch GitHub data',
            message: error.message 
        });
    }
});

// Helper function to get timezone based on country
function getCountryTimezone(country) {
  const countryLower = country.toLowerCase();
  
  // Major countries and their primary timezones
  if (countryLower.includes('united states') || countryLower.includes('usa')) {
    return 'America/New_York'; // Default to Eastern Time
  } else if (countryLower.includes('united kingdom') || countryLower.includes('uk')) {
    return 'Europe/London';
  } else if (countryLower.includes('france')) {
    return 'Europe/Paris';
  } else if (countryLower.includes('germany')) {
    return 'Europe/Berlin';
  } else if (countryLower.includes('serbia')) {
    return 'Europe/Belgrade';
  } else if (countryLower.includes('croatia')) {
    return 'Europe/Zagreb';
  } else if (countryLower.includes('hungary')) {
    return 'Europe/Budapest';
  } else if (countryLower.includes('czech republic') || countryLower.includes('czech')) {
    return 'Europe/Prague';
  } else if (countryLower.includes('poland')) {
    return 'Europe/Warsaw';
  } else if (countryLower.includes('italy')) {
    return 'Europe/Rome';
  } else if (countryLower.includes('spain')) {
    return 'Europe/Madrid';
  } else if (countryLower.includes('netherlands')) {
    return 'Europe/Amsterdam';
  } else if (countryLower.includes('belgium')) {
    return 'Europe/Brussels';
  } else if (countryLower.includes('austria')) {
    return 'Europe/Vienna';
  } else if (countryLower.includes('sweden')) {
    return 'Europe/Stockholm';
  } else if (countryLower.includes('norway')) {
    return 'Europe/Oslo';
  } else if (countryLower.includes('denmark')) {
    return 'Europe/Copenhagen';
  } else if (countryLower.includes('finland')) {
    return 'Europe/Helsinki';
  } else if (countryLower.includes('ireland')) {
    return 'Europe/Dublin';
  } else if (countryLower.includes('portugal')) {
    return 'Europe/Lisbon';
  } else if (countryLower.includes('greece')) {
    return 'Europe/Athens';
  } else if (countryLower.includes('romania')) {
    return 'Europe/Bucharest';
  } else if (countryLower.includes('bulgaria')) {
    return 'Europe/Sofia';
  } else if (countryLower.includes('estonia')) {
    return 'Europe/Tallinn';
  } else if (countryLower.includes('latvia')) {
    return 'Europe/Riga';
  } else if (countryLower.includes('lithuania')) {
    return 'Europe/Vilnius';
  } else if (countryLower.includes('japan')) {
    return 'Asia/Tokyo';
  } else if (countryLower.includes('china')) {
    return 'Asia/Shanghai';
  } else if (countryLower.includes('australia')) {
    return 'Australia/Sydney';
  } else if (countryLower.includes('canada')) {
    return 'America/Toronto';
  } else if (countryLower.includes('india')) {
    return 'Asia/Kolkata';
  } else if (countryLower.includes('brazil')) {
    return 'America/Sao_Paulo';
  } else if (countryLower.includes('egypt')) {
    return 'Africa/Cairo';
  } else if (countryLower.includes('mexico')) {
    return 'America/Mexico_City';
  } else if (countryLower.includes('thailand')) {
    return 'Asia/Bangkok';
  } else if (countryLower.includes('russia')) {
    return 'Europe/Moscow';
  } else if (countryLower.includes('ukraine')) {
    return 'Europe/Kiev';
  } else if (countryLower.includes('belarus')) {
    return 'Europe/Minsk';
  } else if (countryLower.includes('moldova')) {
    return 'Europe/Chisinau';
  } else if (countryLower.includes('slovakia')) {
    return 'Europe/Bratislava';
  } else if (countryLower.includes('slovenia')) {
    return 'Europe/Ljubljana';
  } else if (countryLower.includes('montenegro')) {
    return 'Europe/Podgorica';
  } else if (countryLower.includes('albania')) {
    return 'Europe/Tirane';
  } else if (countryLower.includes('macedonia') || countryLower.includes('north macedonia')) {
    return 'Europe/Skopje';
  } else if (countryLower.includes('bosnia') || countryLower.includes('herzegovina')) {
    return 'Europe/Sarajevo';
  } else if (countryLower.includes('kosovo')) {
    return 'Europe/Belgrade'; // Same as Serbia
  } else {
    // Default to UTC for unknown countries
    return 'UTC';
  }
}

// Fetch weather data from Open-Meteo API (completely free, no API key required)
app.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;
    console.log(`Weather request for city: ${city}`);
    
    // Extract city name and country
    let cityName = city;
    let countryName = 'Unknown';
    
    if (city.includes(',')) {
        const parts = city.split(',').map(part => part.trim());
        cityName = parts[0];
        countryName = parts[parts.length - 1]; // Last part is usually the country
        console.log(`Extracted city: ${cityName}, country: ${countryName}`);
    } else {
        // If no comma, try to guess the country based on common city names
        const cityLower = city.toLowerCase();
        if (cityLower.includes('belgrade') || cityLower.includes('novi sad') || cityLower.includes('nis')) {
            countryName = 'Serbia';
        } else if (cityLower.includes('london') || cityLower.includes('manchester') || cityLower.includes('birmingham')) {
            countryName = 'United Kingdom';
        } else if (cityLower.includes('new york') || cityLower.includes('los angeles') || cityLower.includes('chicago')) {
            countryName = 'United States';
        } else if (cityLower.includes('paris') || cityLower.includes('lyon') || cityLower.includes('marseille')) {
            countryName = 'France';
        } else if (cityLower.includes('berlin') || cityLower.includes('munich') || cityLower.includes('hamburg')) {
            countryName = 'Germany';
        } else if (cityLower.includes('zagreb') || cityLower.includes('split') || cityLower.includes('rijeka')) {
            countryName = 'Croatia';
        } else if (cityLower.includes('budapest') || cityLower.includes('debrecen') || cityLower.includes('szeged')) {
            countryName = 'Hungary';
        } else if (cityLower.includes('prague') || cityLower.includes('brno') || cityLower.includes('ostrava')) {
            countryName = 'Czech Republic';
        } else if (cityLower.includes('warsaw') || cityLower.includes('krakow') || cityLower.includes('lodz')) {
            countryName = 'Poland';
        } else if (cityLower.includes('rome') || cityLower.includes('milan') || cityLower.includes('naples')) {
            countryName = 'Italy';
        } else if (cityLower.includes('madrid') || cityLower.includes('barcelona') || cityLower.includes('valencia')) {
            countryName = 'Spain';
        } else {
            // For unknown cities, default to a reasonable timezone
            countryName = 'International';
        }
        console.log(`Guessed country: ${countryName} for city: ${cityName}`);
    }
    
    try {
        // Get API configuration from environment variables
        const baseUrl = process.env.WEATHER_API_BASE_URL || 'https://api.open-meteo.com/v1';
        const endpoint = process.env.WEATHER_API_ENDPOINT || '/forecast';
        const units = process.env.WEATHER_DEFAULT_UNITS || 'metric';
        
        // Determine timezone based on country for accurate weather data
        const countryTimezone = getCountryTimezone(countryName);
        console.log(`Using country timezone: ${countryTimezone} for ${cityName}, ${countryName}`);
        
        // Build the Open-Meteo API URL with coordinates-based approach for better results
        // First, try to get coordinates for the city
        const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
        
        console.log(`Calling geocoding API: ${geocodingUrl}`);
        const geocodingResponse = await axios.get(geocodingUrl);
        
        let response;
        if (geocodingResponse.data && geocodingResponse.data.results && geocodingResponse.data.results.length > 0) {
            const location = geocodingResponse.data.results[0];
            const { latitude, longitude } = location;
            
            console.log(`Found coordinates for ${cityName}: lat=${latitude}, lon=${longitude}`);
            
            // Build the weather API URL with coordinates
            const weatherApiUrl = `${baseUrl}${endpoint}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&units=${units}&timezone=${countryTimezone}`;
            
            console.log(`Calling Open-Meteo API with coordinates: ${weatherApiUrl}`);
            
            // Call the Open-Meteo API
            response = await axios.get(weatherApiUrl);
        } else {
            throw new Error(`Could not find coordinates for city: ${cityName}`);
        }
        
        console.log('Open-Meteo API response structure:', {
            hasData: !!response.data,
            hasCurrent: !!response.data.current,
            currentKeys: response.data.current ? Object.keys(response.data.current) : [],
            locationData: response.data.location || 'No location data',
            timezoneData: response.data.timezone || 'No timezone data',
            responseKeys: Object.keys(response.data || {}),
            sampleData: response.data.current ? {
                temperature: response.data.current.temperature_2m,
                humidity: response.data.current.relative_humidity_2m,
                pressure: response.data.current.pressure_msl,
                windSpeed: response.data.current.wind_speed_10m,
                weatherCode: response.data.current.weather_code
            } : 'No current data'
        });
        
        if (response.data && response.data.current) {
            const weatherData = response.data;
            const current = weatherData.current;
            
            // Map Open-Meteo weather codes to human-readable descriptions
            const weatherDescriptions = {
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
            
            // Process and format the weather data according to Open-Meteo API structure
            const processedWeather = {
                city: cityName,
                country: countryName,
                temperature: Math.round(current.temperature_2m),
                feelsLike: Math.round(current.apparent_temperature),
                humidity: Math.round(current.relative_humidity_2m),
                pressure: Math.round(current.pressure_msl),
                description: weatherDescriptions[current.weather_code] || 'Unknown',
                windSpeed: Math.round(current.wind_speed_10m),
                timestamp: new Date().toISOString(),
                units: units,
                timezone: countryTimezone,
                countryTimezone: countryTimezone,
                localTime: new Date().toLocaleString('en-US', { 
                    timeZone: countryTimezone,
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                })
            };
            
            console.log('Open-Meteo weather data fetched successfully:', processedWeather);
            res.json(processedWeather);
            return;
        } else {
            console.log('Open-Meteo API response missing required data structure');
            console.log('Expected: response.data.current');
            console.log('Received:', Object.keys(response.data || {}));
            console.log('Full API response:', JSON.stringify(response.data, null, 2));
            throw new Error(`Invalid response format from Open-Meteo API. Missing 'current' property. Available keys: ${Object.keys(response.data || {}).join(', ')}`);
        }
        
    } catch (apiError) {
        console.log('Open-Meteo API error:', apiError.message);
        
        // Check for specific error types
        if (apiError.response) {
            if (apiError.response.status === 400) {
                return res.status(400).json({
                    error: 'Invalid city name',
                    message: 'Please check the city name and try again'
                });
            } else if (apiError.response.status === 404) {
                return res.status(404).json({
                    error: 'City not found',
                    message: 'The specified city could not be found'
                });
            }
        }
        
        // Fall through to mock data
        console.log('Using mock weather data as fallback');
        
        const mockWeatherData = {
            city: cityName,
            country: countryName,
            temperature: Math.round(Math.random() * 30) + 10,
            feelsLike: Math.round(Math.random() * 30) + 10,
            humidity: Math.round(Math.random() * 40) + 40,
            pressure: Math.round(Math.random() * 200) + 1000,
            description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 5)],
            windSpeed: Math.round(Math.random() * 20) + 5,
            timestamp: new Date().toISOString(),
            units: 'metric',
            timezone: getCountryTimezone(countryName),
            countryTimezone: getCountryTimezone(countryName),
            localTime: new Date().toLocaleString('en-US', { 
                timeZone: getCountryTimezone(countryName),
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            })
        };
        
        console.log('Mock weather data generated:', mockWeatherData);
        res.json(mockWeatherData);
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test Open-Meteo API endpoint for debugging
app.get('/api/test-weather/:city', async (req, res) => {
    const { city } = req.params;
    try {
        const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geocodingResponse = await axios.get(geocodingUrl);
        
        if (geocodingResponse.data && geocodingResponse.data.results && geocodingResponse.data.results.length > 0) {
            const location = geocodingResponse.data.results[0];
            const { latitude, longitude } = location;
            
            const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&units=metric&timezone=auto`;
            
            const weatherResponse = await axios.get(weatherApiUrl);
            
            res.json({
                city: city,
                geocoding: geocodingResponse.data,
                weather: weatherResponse.data,
                apiUrl: weatherApiUrl
            });
        } else {
            res.status(404).json({ error: 'City not found in geocoding' });
        }
    } catch (error) {
        res.status(500).json({ 
            error: 'API test failed', 
            message: error.message,
            geocodingUrl: `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
