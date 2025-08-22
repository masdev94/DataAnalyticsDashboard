# Data Analytics Dashboard

A comprehensive, real-time data analytics dashboard that fetches and processes interesting data from multiple public APIs, providing valuable insights through an intuitive web interface.

## What Does Your App Do?

This application is a **Data Analytics Dashboard** that aggregates and visualizes real-time data from three key sources:

- ** Cryptocurrency Market Data**: Real-time cryptocurrency prices, market caps, and 24h performance from CoinGecko API
- ** GitHub Trending Repositories**: Popular repositories, programming language trends, and developer insights from GitHub API
- ** Global Weather Information**: Current weather data with IP-based location detection and city search from Open-Meteo API

The dashboard processes this raw data through intelligent algorithms to provide:
- Market trend analysis and performance metrics
- Programming language popularity insights
- Weather patterns and location-based forecasting
- Interactive charts and visualizations
- Real-time data updates and historical comparisons

##  Why Is This Data Interesting or Valuable?

### **For Investors & Traders:**
- **Cryptocurrency Insights**: Real-time market analysis helps identify trending coins, market sentiment, and investment opportunities
- **Performance Tracking**: 24h gainers/losers provide quick market overview for decision-making
- **Market Cap Distribution**: Visual representation of market concentration and diversification opportunities

### **For Developers & Tech Professionals:**
- **Technology Trends**: See which programming languages and frameworks are gaining popularity
- **Repository Discovery**: Find trending open-source projects and emerging technologies
- **Community Insights**: Understand what the developer community is building and supporting

### **For General Users:**
- **Weather Intelligence**: Location-aware weather data with timezone accuracy
- **Global Perspective**: Compare weather patterns across different regions
- **Planning Tool**: Make informed decisions based on current conditions and forecasts

##  Who Might Find This Useful?

### **Primary Users:**
- **Financial Analysts & Crypto Traders**: Need real-time market data and trend analysis
- **Software Developers**: Want to stay updated on trending technologies and repositories
- **Product Managers**: Need insights into technology adoption and market trends
- **Data Scientists**: Can use the aggregated data for further analysis and research

### **Secondary Users:**
- **Students**: Learning about data visualization and API integration
- **Researchers**: Studying market trends, technology adoption, or weather patterns
- **Business Owners**: Understanding market dynamics and technology trends
- **General Public**: Interested in cryptocurrency, technology, or weather information

##  UX/DX Touches That Make the App Delightful

### **User Experience Enhancements:**
- ** Professional Dark Theme**: Easy on the eyes with professional color scheme
- ** Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ** Real-time Updates**: Live data refresh with loading states and error handling
- ** Interactive Charts**: Hover effects, zoom capabilities, and responsive visualizations
- ** Smart Search**: Autocomplete city search with recent search history
- ** Pagination**: Clean, modern pagination for large datasets
- ** Smooth Animations**: Subtle hover effects and transitions for better engagement

### **Developer Experience Features:**
- ** Modular Architecture**: Clean separation of concerns with reusable components
- ** TypeScript**: Full type safety and better development experience
- ** Custom Hooks**: Reusable logic for data fetching and state management
- ** Error Boundaries**: Graceful error handling and recovery
- ** Component Library**: Consistent UI components with proper styling
- ** Fast Development**: Hot reload and optimized build process

##  Architecture Overview

### **Frontend (React + TypeScript + Vite)**
```
frontend/
├── src/
│   ├── components/
│   │   ├── dashboard/          # Dashboard sections
│   │   ├── pages/             # Page-level components
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── context/               # React context for state management
│   ├── services/              # API service layer
│   ├── utils/                 # Utility functions
│   └── types/                 # TypeScript type definitions
```

### **Backend (Node.js + Express)**
```
backend/
├── routes/                    # API route handlers
├── services/                  # Business logic layer
├── utils/                     # Utility functions and helpers
├── middleware/                # Request validation and processing
└── server.js                  # Main server entry point
```

##  Getting Started

### **Prerequisites**
- Node.js 20+ 
- npm or yarn
- Modern web browser

### **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### **Backend Setup**
```bash
cd backend
npm install
npm start or npm run dev
```

The backend API will be available at `http://localhost:5000`

### **Environment Variables**
Create `.env` files in both frontend and backend directories:

**Frontend (.env)**
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# External Services
VITE_IP_GEOLOCATION_API=https://ipapi.co/json/

# Feature Flags
VITE_ENABLE_DEBUG_LOGGING=false
VITE_ENABLE_ANALYTICS=false

# UI Configuration
VITE_DEFAULT_THEME=dark
VITE_ITEMS_PER_PAGE=5

# Development
VITE_DEV_MODE=true
VITE_API_TIMEOUT=10000
```

**Backend (.env)**
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

##  API Endpoints

### **Cryptocurrency Data**
- `GET /api/crypto` - Fetch market data, top gainers/losers, and market cap distribution

### **GitHub Trending**
- `GET /api/github` - Fetch trending repositories, language statistics, and star/fork data

### **Weather Information**
- `GET /api/weather/:city` - Fetch current weather data for specified city

##  Technologies Used

### **Frontend**
- **React 19** - Modern React with hooks and context
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Beautiful and responsive charts
- **React Icons** - Modern icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### **APIs & Services**
- **CoinGecko API** - Cryptocurrency market data
- **GitHub API** - Repository and trending data
- **Open-Meteo API** - Weather and geocoding services
- **IP Geolocation** - User location detection

##  Features

### **Dashboard Overview**
- Real-time data aggregation from multiple sources
- Interactive charts and visualizations
- Responsive grid layout with professional styling
- Error handling and loading states

### **Cryptocurrency Section**
- Market overview with key metrics
- Top gainers and losers (24h)
- Market cap distribution charts
- Price performance visualization
- Real-time data updates

### **GitHub Section**
- Trending repositories with pagination
- Programming language distribution
- Stars vs Forks comparison charts
- Repository details and links
- Search and filtering capabilities

### **Weather Section**
- IP-based location detection
- City search with autocomplete
- Current weather conditions
- Timezone-aware time display
- Unit conversion (metric/imperial)

##  Error Handling & Edge Cases

- **Network Failures**: Graceful fallbacks and retry mechanisms
- **API Rate Limits**: Proper error messages and retry logic
- **Data Validation**: Input validation and sanitization
- **Error Boundaries**: React error boundaries for component-level error handling
- **Loading States**: Skeleton loaders and progress indicators
- **Empty States**: Helpful messages when no data is available

##  Deployment

### **Frontend Deployment**
```bash
cd frontend
npm run build
# Deploy the dist/ folder to your hosting service
```

### **Backend Deployment**
```bash
cd backend
npm start
# Use PM2 or similar process manager for production
```

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

##  Acknowledgments

- **CoinGecko** for cryptocurrency data
- **GitHub** for repository and trending data
- **Open-Meteo** for weather and geocoding services
- **React** and **Node.js** communities for excellent tooling

---

**Built with  using modern web technologies for a better data-driven world.**
