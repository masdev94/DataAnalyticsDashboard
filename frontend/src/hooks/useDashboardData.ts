import { useEffect, useMemo, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { apiService } from '../services/api';
import { formatCurrency, formatPercentage } from '../utils/formatters';

export function useCryptoData() {
  const { state, dispatch } = useDashboard();

  const fetchCryptoData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { crypto: true } });
    
    const response = await apiService.getCryptoData();
    
    if (response.error) {
      dispatch({ type: 'SET_ERROR', payload: { crypto: response.error } });
    } else if (response.data) {
      dispatch({ type: 'SET_CRYPTO_DATA', payload: response.data });
    }
  };

  const refreshCryptoData = () => {
    fetchCryptoData();
  };

  useEffect(() => {
    if (!state.crypto && !state.loading.crypto && !state.errors.crypto) {
      fetchCryptoData();
    }
  }, []);

  return {
    data: state.crypto,
    loading: state.loading.crypto,
    error: state.errors.crypto,
    refresh: refreshCryptoData,
  };
}

export function useGitHubData() {
  const { state, dispatch } = useDashboard();

  const fetchGitHubData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { github: true } });
    
    const response = await apiService.getGitHubData();
    
    if (response.error) {
      dispatch({ type: 'SET_ERROR', payload: { github: response.error } });
    } else if (response.data) {
      dispatch({ type: 'SET_GITHUB_DATA', payload: response.data });
    }
  };

  const refreshGitHubData = () => {
    fetchGitHubData();
  };

  useEffect(() => {
    if (!state.github && !state.loading.github && !state.errors.github) {
      fetchGitHubData();
    }
  }, []);

  return {
    data: state.github,
    loading: state.loading.github,
    error: state.errors.github,
    refresh: refreshGitHubData,
  };
}

export function useWeatherData() {
  const { state, dispatch } = useDashboard();

  const fetchWeatherData = async (city: string) => {
    if (!city.trim()) return;
    
    console.log('Fetching weather for city:', city);
    dispatch({ type: 'SET_LOADING', payload: { weather: true } });
    
    const response = await apiService.getWeatherData(city);
    console.log('Weather API response:', response);
    
    if (response.error) {
      console.error('Weather API error:', response.error);
      dispatch({ type: 'SET_ERROR', payload: { weather: response.error } });
    } else if (response.data) {
      console.log('Weather data received:', response.data);
      dispatch({ type: 'SET_WEATHER_DATA', payload: response.data });
    }
  };

  const clearWeatherData = () => {
    dispatch({ type: 'SET_WEATHER_DATA', payload: null as any });
  };

  return {
    data: state.weather,
    loading: state.loading.weather,
    error: state.errors.weather,
    fetch: fetchWeatherData,
    clear: clearWeatherData,
  };
}

// Enhanced Crypto Section Hook
export function useCryptoSection() {
  const { data, loading, error, refresh } = useCryptoData();

  const processedData = useMemo(() => {
    if (!data) return null;

    return {
      // Market Overview
      marketOverview: {
        totalMarketCap: data.totalMarketCap,
        totalCoins: data.coins.length,
        averagePrice: data.averagePrice
      },
      
      // Top Gainers (top 5)
      topGainers: data.coins
        .filter(coin => coin.price_change_percentage_24h > 0)
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 5)
        .map(coin => ({
          ...coin,
          change: formatPercentage(coin.price_change_percentage_24h)
        })),
      
      // Top Losers (top 5)
      topLosers: data.coins
        .filter(coin => coin.price_change_percentage_24h < 0)
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, 5)
        .map(coin => ({
          ...coin,
          change: formatPercentage(coin.price_change_percentage_24h)
        })),
      
      // Top Coins by Market Cap
      topByMarketCap: data.coins
        .sort((a, b) => b.market_cap - a.market_cap)
        .slice(0, 10)
        .map((coin, index) => ({
          ...coin,
          rank: index + 1,
          marketCapFormatted: formatCurrency(coin.market_cap),
          priceFormatted: formatCurrency(coin.current_price),
          change: formatPercentage(coin.price_change_percentage_24h)
        }))
    };
  }, [data]);

  return {
    data: processedData,
    loading,
    error,
    refresh,
    hasData: !!data
  };
}

// Enhanced GitHub Section Hook
export function useGitHubSection() {
  const { data, loading, error, refresh } = useGitHubData();

  const processedData = useMemo(() => {
    if (!data) return null;

    return {
      // Overview Statistics
      overview: {
        totalRepos: data.totalRepos,
        totalStars: data.totalStars,
        totalForks: data.totalForks,
        averageStars: data.averageStars
      },
      
      // Chart Data for Languages
      chartData: Object.entries(data.topLanguages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8)
        .map(([language, count]) => ({
          name: language,
          value: count,
          percentage: Math.round((count / data.totalRepos) * 100)
        })),
      
      // Bar Chart Data for Stars vs Forks
      starsData: data.topRepos
        .slice(0, 10)
        .map(repo => ({
          name: repo.name.length > 20 ? repo.name.substring(0, 20) + '...' : repo.name,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          fullName: repo.full_name
        })),
      
      // Repository Data for Pagination
      repositories: data.topRepos,
      totalRepos: data.totalRepos
    };
  }, [data]);

  return {
    data: processedData,
    loading,
    error,
    refresh,
    hasData: !!data
  };
}

// Enhanced Weather Section Hook
export function useWeatherSection() {
  const { data, loading, error, fetch, clear } = useWeatherData();
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Detect user's IP location on component mount
  useEffect(() => {
    const detectUserLocation = async () => {
      setIsDetectingLocation(true);
      try {
        // Use the API service for IP geolocation
        const response = await apiService.getIpLocation();
        if (response.error) {
          throw new Error(response.error);
        }
        
        const locationData = response.data;
        if (locationData.city && locationData.country_name) {
          const location = `${locationData.city}, ${locationData.country_name}`;
          setUserLocation(location);
          // Automatically fetch weather for user's location
          fetch(locationData.city);
        }
      } catch (error) {
        console.log('Could not detect user location:', error);
        // Fallback to a default city
        setUserLocation('London, United Kingdom');
        fetch('London');
      } finally {
        setIsDetectingLocation(false);
      }
    };

    // Only detect location if no weather data exists
    if (!data && !loading) {
      detectUserLocation();
    }
  }, []); // Removed dependencies to avoid infinite loops

  const processedData = useMemo(() => {
    if (!data) return null;

    return {
      // City Info
      cityInfo: {
        name: data.city || 'Unknown',
        country: data.country || 'Unknown',
        timezone: data.timezone || 'Unknown',
        lastUpdated: data.timestamp || new Date().toISOString(),
        // Format time in the country's timezone
        localTime: data.timezone ? 
          new Date().toLocaleString('en-US', { 
            timeZone: data.timezone,
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          }) : 
          new Date().toLocaleString()
      },
      
      // Weather Stats
      weatherStats: {
        temperature: data.temperature || 0,
        feelsLike: data.feelsLike || 0,
        humidity: data.humidity || 0,
        pressure: data.pressure || 0,
        windSpeed: data.windSpeed || 0,
        description: data.description || 'Unknown'
      },
      
      // Formatted Values
      formatted: {
        temperature: `${data.temperature || 0}°C`,
        feelsLike: `${data.feelsLike || 0}°C`,
        humidity: `${data.humidity || 0}%`,
        pressure: `${data.pressure || 0} hPa`,
        windSpeed: `${data.windSpeed || 0} m/s`
      }
    };
  }, [data]);

  const searchWeather = (city: string) => {
    if (city.trim()) {
      fetch(city);
    }
  };

  const clearWeather = () => {
    clear();
  };

  const refreshWeather = () => {
    // Refresh weather for the current city if available
    if (data?.city) {
      fetch(data.city);
    } else if (userLocation) {
      // If no current data but we have user location, fetch for that
      const cityName = userLocation.split(',')[0];
      fetch(cityName);
    } else {
      // Fallback to London
      fetch('London');
    }
  };

  return {
    data: processedData,
    loading: loading || isDetectingLocation,
    error,
    search: searchWeather,
    clear: clearWeather,
    refresh: refreshWeather,
    hasData: !!data,
    userLocation,
    isDetectingLocation
  };
}

// Dashboard Overview Hook
export function useDashboardOverview() {
  const cryptoHook = useCryptoSection();
  const githubHook = useGitHubSection();
  const weatherHook = useWeatherSection();

  const overview = useMemo(() => {
    const sections = [
      { name: 'Cryptocurrency', ...cryptoHook },
      { name: 'GitHub', ...githubHook },
      { name: 'Weather', ...weatherHook }
    ];

    const totalLoading = sections.some(section => section.loading);
    const totalErrors = sections.filter(section => section.error).length;
    const loadedSections = sections.filter(section => section.hasData).length;

    return {
      sections,
      totalLoading,
      totalErrors,
      loadedSections,
      totalSections: sections.length,
      isFullyLoaded: loadedSections === sections.length && !totalLoading && totalErrors === 0
    };
  }, [cryptoHook, githubHook, weatherHook]);

  return overview;
}
