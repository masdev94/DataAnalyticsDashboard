# Dashboard Backend API

A clean, modular, and scalable Node.js backend API for the Dashboard application.

## 🏗️ Architecture

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
└── package.json
```

## 🚀 Features

- **Modular Design**: Clean separation of concerns
- **Service Layer**: Business logic separated from routes
- **Error Handling**: Consistent error responses
- **Validation**: Request parameter validation
- **Timezone Support**: Proper timezone handling for weather data
- **Fallback Data**: Mock data when external APIs fail

## 📦 Installation

```bash
cd backend
npm install
```

## 🔧 Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
```

## 🏃‍♂️ Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 🌐 API Endpoints

### Cryptocurrency
- `GET /api/crypto` - Get market data from CoinGecko

### GitHub
- `GET /api/github` - Get trending repositories

### Weather
- `GET /api/weather/:city` - Get weather data for a city

### Health Check
- `GET /health` - Server status

## 🛠️ Dependencies

- **Express.js** - Web framework
- **Axios** - HTTP client for external APIs
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🔍 External APIs

- **CoinGecko** - Cryptocurrency data
- **GitHub** - Repository information
- **Open-Meteo** - Weather data and geocoding

## 📝 Code Quality

- **Clean Code**: Readable and maintainable
- **Modular Structure**: Easy to extend and modify
- **Error Handling**: Comprehensive error management
- **Validation**: Input parameter validation
- **Documentation**: Clear code comments

## 🚀 Future Enhancements

- Rate limiting
- Caching layer
- Authentication
- Logging system
- Unit tests
- API documentation (Swagger)
