# Dashboard Backend API

A clean, modular, and scalable Node.js backend API for the Dashboard application with comprehensive environment variable configuration and robust error handling.

##  Architecture

```
backend/
├── server.js              # Main server entry point
├── routes/                # API route handlers
│   ├── crypto.js         # Cryptocurrency endpoints
│   ├── github.js         # GitHub trending endpoints
│   └── weather.js        # Weather data endpoints
├── services/              # Business logic layer
│   ├── cryptoService.js  # Crypto API integration
│   ├── githubService.js  # GitHub API integration
│   └── weatherService.js # Weather API integration
├── utils/                 # Utility classes
│   ├── cryptoDataProcessor.js
│   ├── githubDataProcessor.js
│   ├── weatherDataProcessor.js
│   └── timezoneHelper.js
├── middleware/            # Request validation
│   └── validation.js
├── .env                   # Environment variables
└── package.json
```

##  Features

- **Modular Design**: Clean separation of concerns with routes, services, and utilities
- **Service Layer**: Business logic separated from routes for maintainability
- **Environment Configuration**: Comprehensive environment variable management
- **Error Handling**: Consistent error responses with fallback data
- **Validation**: Request parameter validation middleware
- **Timezone Support**: Proper timezone handling for weather data
- **Fallback Data**: Mock data when external APIs fail
- **API Timeouts**: Configurable timeout settings for external API calls
- **CORS Configuration**: Flexible CORS settings for different environments

##  Installation

```bash
cd backend
npm install
```

##  Configuration

### Environment Variables

Create a `.env` file in the backend directory based on `.env.example`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# External API URLs
OPEN_METEO_BASE_URL=https://api.open-meteo.com/v1
OPEN_METEO_GEOCODING_URL=https://geocoding-api.open-meteo.com/v1
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
GITHUB_API_BASE_URL=https://api.github.com

# API Rate Limiting
COINGECKO_RATE_LIMIT=50
GITHUB_RATE_LIMIT=60
OPEN_METEO_RATE_LIMIT=100

# Timeout Configuration
API_TIMEOUT=10000
REQUEST_TIMEOUT=5000

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
CORS_CREDENTIALS=true

# Logging
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=true

# Security
ENABLE_RATE_LIMITING=true
MAX_REQUESTS_PER_MINUTE=100
```

### Production Configuration

For production, use `.env.production.example` as a template and adjust values accordingly.

##  Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

##  API Endpoints

### Cryptocurrency
- `GET /api/crypto` - Get market data from CoinGecko API
  - Returns: Market overview, top gainers/losers, market cap data

### GitHub
- `GET /api/github` - Get trending repositories from GitHub API
  - Returns: Repository statistics, language breakdown, trending repos

### Weather
- `GET /api/weather/:city` - Get weather data for a specific city
  - Parameters: `city` - City name (e.g., "London", "New York")
  - Returns: Current weather, coordinates, timezone, and country info
  - Features: Automatic geocoding, timezone detection, fallback data

### Health Check
- `GET /health` - Server status and timestamp

##  Dependencies

- **Express.js** - Web framework for building APIs
- **Axios** - HTTP client for external API calls
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management
- **Nodemon** - Development server with auto-restart

##  External APIs

- **CoinGecko** - Cryptocurrency market data and statistics
- **GitHub** - Repository information and trending data
- **Open-Meteo** - Weather data and geocoding services
  - Free, no API key required
  - Accurate weather information
  - Global coverage

##  Code Quality

- **Clean Code**: Readable and maintainable codebase
- **Modular Structure**: Easy to extend and modify
- **Error Handling**: Comprehensive error management with fallbacks
- **Validation**: Input parameter validation middleware
- **Environment Management**: Secure configuration handling
- **Documentation**: Clear code structure and examples

##  Security Features

- **Environment Variables**: Sensitive data kept out of source code
- **Input Validation**: Request parameter sanitization
- **CORS Configuration**: Controlled cross-origin access
- **Rate Limiting**: Configurable API request limits
- **Error Sanitization**: Safe error messages in production

##  Future Enhancements

- [ ] Rate limiting implementation
- [ ] Caching layer (Redis)
- [ ] Authentication and authorization
- [ ] Comprehensive logging system
- [ ] Unit and integration tests
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Health check endpoints for external APIs
- [ ] Metrics and monitoring
- [ ] Docker containerization
- [ ] CI/CD pipeline integration

##  Performance

- **Async Operations**: Non-blocking API calls
- **Timeout Handling**: Configurable API timeouts
- **Fallback Data**: Graceful degradation when external APIs fail
- **Efficient Processing**: Optimized data transformation

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the modular architecture
4. Add tests if applicable
5. Update documentation
6. Submit a pull request


---

**Built with  using Node.js and modern web technologies**
