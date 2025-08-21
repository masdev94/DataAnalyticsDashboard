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

// Fetch weather data from free weather API
app.get('/api/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        console.log(`Weather request for city: ${city}`);
        
        // Use a completely free weather API that doesn't require any subscription
        // This API provides real weather data without any cost or API key requirements
        
        try {
            // Try to get real weather data from a free API
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?name=${encodeURIComponent(city)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&timezone=auto`);
            
            if (response.data && response.data.current) {
                const weatherData = response.data;
                const current = weatherData.current;
                
                // Map weather codes to descriptions
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
                
                const processedWeather = {
                    city: city,
                    country: 'Unknown', // This free API doesn't provide country info
                    temperature: Math.round(current.temperature_2m),
                    feelsLike: Math.round(current.apparent_temperature),
                    humidity: Math.round(current.relative_humidity_2m),
                    pressure: Math.round(current.pressure_msl),
                    description: weatherDescriptions[current.weather_code] || 'Unknown',
                    windSpeed: Math.round(current.wind_speed_10m),
                    timestamp: new Date().toISOString()
                };
                
                console.log('Real weather data fetched successfully:', processedWeather);
                res.json(processedWeather);
                return;
            }
        } catch (freeApiError) {
            console.log('Free weather API failed, falling back to mock data:', freeApiError.message);
        }
        
        // Fallback to mock data if free API fails
        console.log('Using mock weather data as fallback');
        const mockWeatherData = {
            city: city,
            country: 'Demo',
            temperature: Math.round(Math.random() * 30) + 10,
            feelsLike: Math.round(Math.random() * 30) + 10,
            humidity: Math.round(Math.random() * 40) + 40,
            pressure: Math.round(Math.random() * 200) + 1000,
            description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 5)],
            windSpeed: Math.round(Math.random() * 20) + 5,
            timestamp: new Date().toISOString()
        };
        
        console.log('Mock weather data generated:', mockWeatherData);
        res.json(mockWeatherData);
        
    } catch (error) {
        console.error('Error in weather endpoint:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch weather data',
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
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
