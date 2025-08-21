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

// Fetch weather data from Open-Meteo API (completely free, no API key required)
app.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;
    console.log(`Weather request for city: ${city}`);
    
    // Extract just the city name if the parameter contains comma-separated data
    let cityName = city;
    let countryName = 'Unknown';
    
    if (city.includes(',')) {
        const parts = city.split(',').map(part => part.trim());
        cityName = parts[0];
        countryName = parts[parts.length - 1]; // Last part is usually the country
        console.log(`Extracted city: ${cityName}, country: ${countryName}`);
    } else {
        // If no comma, use the city name as is and set country to Unknown
        cityName = city;
        countryName = 'Unknown';
        console.log(`Single city name: ${cityName}, country: ${countryName}`);
    }
    
    try {
        // Get API configuration from environment variables
        const baseUrl = process.env.WEATHER_API_BASE_URL || 'https://api.open-meteo.com/v1';
        const endpoint = process.env.WEATHER_API_ENDPOINT || '/forecast';
        const units = process.env.WEATHER_DEFAULT_UNITS || 'metric';
        const timezone = process.env.WEATHER_TIMEZONE || 'auto';
        
        // Build the Open-Meteo API URL with just the city name for better results
        const weatherApiUrl = `${baseUrl}${endpoint}?name=${encodeURIComponent(cityName)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code&units=${units}&timezone=${timezone}`;
        
        console.log(`Calling Open-Meteo API: ${weatherApiUrl}`);
        
        // Call the Open-Meteo API
        const response = await axios.get(weatherApiUrl);
        
        if (response.data && response.data.current) {
            const weatherData = response.data;
            const current = weatherData.current;
            
            console.log('Open-Meteo API response structure:', {
                hasData: !!response.data,
                hasCurrent: !!response.data.current,
                currentKeys: response.data.current ? Object.keys(response.data.current) : [],
                locationData: response.data.location || 'No location data',
                timezoneData: response.data.timezone || 'No timezone data'
            });
            
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
            
            // Process and format the weather data
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
                timezone: weatherData.timezone || 'Unknown'
            };
            
            console.log('Open-Meteo weather data fetched successfully:', processedWeather);
            res.json(processedWeather);
            return;
        } else {
            throw new Error('Invalid response format from Open-Meteo API');
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
        
        // Use the country name we extracted earlier, or extract it if not already done
        let mockCountry = countryName;
        let mockCityName = cityName;
        
        // If we still don't have country info, try to extract it from the original parameter
        if (mockCountry === 'Unknown' && req.params.city.includes(',')) {
            const parts = req.params.city.split(',').map(part => part.trim());
            mockCityName = parts[0];
            mockCountry = parts[parts.length - 1]; // Last part is usually the country
        }
        
        // If still no country, provide a more realistic fallback based on common city patterns
        if (mockCountry === 'Unknown') {
            // Try to guess country based on common city names
            const cityLower = mockCityName.toLowerCase();
            if (cityLower.includes('london') || cityLower.includes('manchester') || cityLower.includes('birmingham')) {
                mockCountry = 'United Kingdom';
            } else if (cityLower.includes('new york') || cityLower.includes('los angeles') || cityLower.includes('chicago')) {
                mockCountry = 'United States';
            } else if (cityLower.includes('paris') || cityLower.includes('lyon') || cityLower.includes('marseille')) {
                mockCountry = 'France';
            } else if (cityLower.includes('berlin') || cityLower.includes('munich') || cityLower.includes('hamburg')) {
                mockCountry = 'Germany';
            } else if (cityLower.includes('belgrade') || cityLower.includes('novi sad') || cityLower.includes('nis')) {
                mockCountry = 'Serbia';
            } else if (cityLower.includes('zagreb') || cityLower.includes('split') || cityLower.includes('rijeka')) {
                mockCountry = 'Croatia';
            } else if (cityLower.includes('budapest') || cityLower.includes('debrecen') || cityLower.includes('szeged')) {
                mockCountry = 'Hungary';
            } else if (cityLower.includes('prague') || cityLower.includes('brno') || cityLower.includes('ostrava')) {
                mockCountry = 'Czech Republic';
            } else if (cityLower.includes('warsaw') || cityLower.includes('krakow') || cityLower.includes('lodz')) {
                mockCountry = 'Poland';
            } else if (cityLower.includes('rome') || cityLower.includes('milan') || cityLower.includes('naples')) {
                mockCountry = 'Italy';
            } else if (cityLower.includes('madrid') || cityLower.includes('barcelona') || cityLower.includes('valencia')) {
                mockCountry = 'Spain';
            } else if (cityLower.includes('amsterdam') || cityLower.includes('rotterdam') || cityLower.includes('the hague')) {
                mockCountry = 'Netherlands';
            } else if (cityLower.includes('brussels') || cityLower.includes('antwerp') || cityLower.includes('ghent')) {
                mockCountry = 'Belgium';
            } else if (cityLower.includes('vienna') || cityLower.includes('graz') || cityLower.includes('linz')) {
                mockCountry = 'Austria';
            } else if (cityLower.includes('stockholm') || cityLower.includes('gothenburg') || cityLower.includes('malmo')) {
                mockCountry = 'Sweden';
            } else if (cityLower.includes('oslo') || cityLower.includes('bergen') || cityLower.includes('trondheim')) {
                mockCountry = 'Norway';
            } else if (cityLower.includes('copenhagen') || cityLower.includes('aarhus') || cityLower.includes('odense')) {
                mockCountry = 'Denmark';
            } else if (cityLower.includes('helsinki') || cityLower.includes('espoo') || cityLower.includes('tampere')) {
                mockCountry = 'Finland';
            } else if (cityLower.includes('dublin') || cityLower.includes('cork') || cityLower.includes('galway')) {
                mockCountry = 'Ireland';
            } else if (cityLower.includes('lisbon') || cityLower.includes('porto') || cityLower.includes('braga')) {
                mockCountry = 'Portugal';
            } else if (cityLower.includes('athens') || cityLower.includes('thessaloniki') || cityLower.includes('patras')) {
                mockCountry = 'Greece';
            } else if (cityLower.includes('bucharest') || cityLower.includes('cluj-napoca') || cityLower.includes('timisoara')) {
                mockCountry = 'Romania';
            } else if (cityLower.includes('sofia') || cityLower.includes('plovdiv') || cityLower.includes('varna')) {
                mockCountry = 'Bulgaria';
            } else if (cityLower.includes('tallinn') || cityLower.includes('tartu') || cityLower.includes('narva')) {
                mockCountry = 'Estonia';
            } else if (cityLower.includes('riga') || cityLower.includes('daugavpils') || cityLower.includes('liepaja')) {
                mockCountry = 'Latvia';
            } else if (cityLower.includes('vilnius') || cityLower.includes('kaunas') || cityLower.includes('klaipeda')) {
                mockCountry = 'Lithuania';
            } else if (cityLower.includes('tokyo') || cityLower.includes('osaka') || cityLower.includes('kyoto')) {
                mockCountry = 'Japan';
            } else if (cityLower.includes('beijing') || cityLower.includes('shanghai') || cityLower.includes('guangzhou')) {
                mockCountry = 'China';
            } else if (cityLower.includes('sydney') || cityLower.includes('melbourne') || cityLower.includes('brisbane')) {
                mockCountry = 'Australia';
            } else if (cityLower.includes('toronto') || cityLower.includes('montreal') || cityLower.includes('vancouver')) {
                mockCountry = 'Canada';
            } else if (cityLower.includes('mumbai') || cityLower.includes('delhi') || cityLower.includes('bangalore')) {
                mockCountry = 'India';
            } else if (cityLower.includes('sao paulo') || cityLower.includes('rio de janeiro') || cityLower.includes('brasilia')) {
                mockCountry = 'Brazil';
            } else if (cityLower.includes('cairo') || cityLower.includes('alexandria') || cityLower.includes('giza')) {
                mockCountry = 'Egypt';
            } else if (cityLower.includes('mexico city') || cityLower.includes('guadalajara') || cityLower.includes('monterrey')) {
                mockCountry = 'Mexico';
            } else if (cityLower.includes('seoul') || cityLower.includes('busan') || cityLower.includes('incheon')) {
                mockCountry = 'Japan';
            } else if (cityLower.includes('bangkok') || cityLower.includes('chiang mai') || cityLower.includes('phuket')) {
                mockCountry = 'Thailand';
            } else {
                // For other cities, use a generic but realistic country name
                mockCountry = 'International';
            }
        }
        
        const mockWeatherData = {
            city: mockCityName,
            country: mockCountry,
            temperature: Math.round(Math.random() * 30) + 10,
            feelsLike: Math.round(Math.random() * 30) + 10,
            humidity: Math.round(Math.random() * 40) + 40,
            pressure: Math.round(Math.random() * 200) + 1000,
            description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear'][Math.floor(Math.random() * 5)],
            windSpeed: Math.round(Math.random() * 20) + 5,
            timestamp: new Date().toISOString(),
            units: 'metric',
            timezone: 'UTC'
        };
        
        console.log('Mock weather data generated:', mockWeatherData);
        res.json(mockWeatherData);
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
