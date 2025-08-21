# Data Analytics Dashboard 🚀

A powerful Node.js application that demonstrates advanced web development skills by fetching, processing, and displaying real-time data from multiple public APIs in an intuitive dashboard interface.

## 🌟 What Does This App Do?

This application is a **comprehensive data analytics dashboard** that:

- **📊 Cryptocurrency Market Analysis**: Fetches real-time data from CoinGecko API to display market caps, price changes, top gainers/losers, and comprehensive coin listings
- **📊 GitHub Analytics**: Fetches trending repositories data, analyzes programming language popularity, and tracks repository metrics
- **🌤️ Weather Intelligence**: Integrates with OpenWeatherMap API to deliver detailed weather information for any city worldwide
- **🔄 Real-time Updates**: Automatically refreshes data and provides manual refresh options for all data sources
- **📱 Responsive Design**: Beautiful, modern UI that works seamlessly on desktop and mobile devices

## 💡 Why Is This Data Interesting or Valuable?

### For Investors & Traders
- **Real-time cryptocurrency insights** help make informed investment decisions
- **Market trend analysis** shows which coins are performing best/worst
- **Market cap aggregation** provides macro view of the crypto ecosystem

### For Developers & Open Source Contributors
- **GitHub trends analysis** shows which technologies and projects are gaining popularity
- **Programming language insights** help developers choose relevant technologies
- **Repository metrics** provide understanding of project success factors

### For Travelers & Planners
- **Global weather access** for trip planning and daily preparation
- **Comprehensive weather data** including humidity, pressure, and wind conditions
- **Real-time updates** ensure current weather information

### For Developers & Product Teams
- **API integration examples** demonstrate best practices for external service consumption
- **Error handling patterns** show robust application design
- **Modular architecture** serves as a template for scalable applications

## 👥 Who Might Find This Useful?

### Primary Users
- **Financial Analysts** - Cryptocurrency market monitoring and analysis
- **Developers & Engineers** - GitHub trends and technology insights
- **Open Source Contributors** - Repository analysis and language popularity
- **Travelers** - Weather information for destination planning

### Business Applications
- **Financial Services** - Market data dashboards for clients
- **Tech Companies** - Technology trend analysis and insights
- **Recruitment Agencies** - Programming language popularity for hiring decisions
- **Educational Institutions** - Teaching API integration and data visualization

## 🛠️ Technical Features

### Backend (Node.js + Express)
- **RESTful API endpoints** for each data source
- **Async/await patterns** for clean asynchronous code
- **Error handling middleware** for graceful failure management
- **CORS support** for cross-origin requests
- **Environment variable configuration** for secure API key management

### Frontend (Vite + React + TypeScript + TailwindCSS)
- **⚡ Vite** - Lightning-fast build tool and dev server with HMR
- **🔷 TypeScript** - Full type safety and better developer experience
- **🎨 TailwindCSS** - Utility-first CSS framework with custom design system
- **🔄 React 18+** - Latest React features with hooks and concurrent rendering
- **📊 Context API + useReducer** - Modern state management patterns
- **🧩 Component-driven architecture** with reusable UI components
- **📱 Mobile-first responsive design** with CSS Grid and Flexbox

### Data Processing
- **Real-time data fetching** from multiple APIs
- **Data aggregation and analysis** (market caps, averages, trends)
- **Smart formatting** (currency, percentages, timestamps)
- **Edge case handling** for missing or invalid data

## 🚀 Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git for cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd product-developer-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and add your API keys:
   - Get News API key from [NewsAPI.org](https://newsapi.org/)
   - Get Weather API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Start the Vite frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Open your browser**
   - Backend API: `http://localhost:5000`
   - Vite Frontend: `http://localhost:5173`

### API Keys Setup

#### GitHub Data
- **No API key required** - uses GitHub's free public API
- Rate limited but sufficient for demonstration
- Provides trending repositories and language analytics

#### Weather API (Optional)
- Visit [OpenWeatherMap](https://openweathermap.org/api)
- Sign up for a free account
- Copy your API key to `.env` file
- **Note**: Free tier includes 1000 calls/day

#### Cryptocurrency Data
- **No API key required** - uses CoinGecko's free public API
- Rate limited but sufficient for demonstration

## 📁 Project Structure

```
product-developer-task/
├── server.js              # Main Express server (Node.js backend)
├── package.json           # Backend dependencies and scripts
├── .env.example          # Environment variables template
├── README.md             # This file
├── views/                 # Legacy EJS templates (replaced by React)
├── public/                # Legacy static files (replaced by React)
└── frontend/              # Modern Vite + React + TypeScript + TailwindCSS frontend
    ├── src/
    │   ├── components/    # Reusable UI components with TailwindCSS
    │   ├── context/       # React Context for state management
    │   ├── hooks/         # Custom React hooks
    │   ├── services/      # API service layer
    │   ├── types/         # TypeScript type definitions
    │   └── utils/         # Utility functions
    ├── tailwind.config.js # TailwindCSS configuration
    ├── postcss.config.js  # PostCSS configuration
    ├── vite.config.ts     # Vite configuration
    ├── package.json       # Frontend dependencies
    └── README.md          # Frontend documentation
```

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (placeholder for future implementation)

## 🌐 API Endpoints

- `GET /` - Main dashboard page
- `GET /api/crypto` - Cryptocurrency market data
- `GET /api/github` - GitHub trending repositories and analytics
- `GET /api/weather/:city` - Weather data for specific city
- `GET /health` - Health check endpoint

## 🎯 Key Learning Outcomes

This project demonstrates:

1. **Node.js Mastery** - Server setup, routing, middleware, error handling
2. **API Integration** - Multiple external service consumption
3. **Data Processing** - Aggregation, analysis, and formatting
4. **Frontend Development** - Modern JavaScript, responsive design
5. **Error Handling** - Graceful failure management
6. **Code Organization** - Modular, maintainable architecture

## 🚀 Deployment

### Local Development
- Perfect for learning and development
- All features work with demo API keys

### Production Deployment
- Deploy to Heroku, Vercel, or any Node.js hosting
- Set environment variables in hosting platform
- Ensure proper CORS configuration for production domains

## 🤝 Contributing

This is a demonstration project, but contributions are welcome:
- Bug fixes and improvements
- Additional data sources
- Enhanced UI/UX features
- Performance optimizations

## 📄 License

MIT License - feel free to use this code for learning and development purposes.

## 🎉 Conclusion

This Data Analytics Dashboard showcases advanced Node.js development skills while providing real value to users through comprehensive data insights. It demonstrates professional-grade code quality, robust error handling, and modern web development practices that would impress any development team or stakeholder.

The application goes beyond basic CRUD operations to show real-world problem-solving abilities, API integration expertise, and attention to user experience - exactly the kind of skills that make a developer valuable in any team environment.
