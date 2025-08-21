import { useMemo } from 'react';
import { useCryptoData, useGitHubData, useWeatherData } from './useDashboardData';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/formatters';

// Main Dashboard Hook
export function useDashboardOverview() {
  const crypto = useCryptoData();
  const github = useGitHubData();
  const weather = useWeatherData();

  const dashboardStatus = useMemo(() => {
    const sections = [
      { name: 'Cryptocurrency', ...crypto, key: 'crypto' },
      { name: 'GitHub', ...github, key: 'github' },
      { name: 'Weather', ...weather, key: 'weather' }
    ];

    const totalLoading = sections.filter(s => s.loading).length;
    const totalErrors = sections.filter(s => s.error).length;
    const totalData = sections.filter(s => s.data).length;

    return {
      sections,
      totalLoading,
      totalErrors,
      totalData,
      allLoaded: totalLoading === 0 && totalData === 3,
      hasErrors: totalErrors > 0,
      isLoading: totalLoading > 0
    };
  }, [crypto, github, weather]);

  return dashboardStatus;
}

// Enhanced Crypto Section Hook
export function useCryptoSection() {
  const { data, loading, error, refresh } = useCryptoData();

  const processedData = useMemo(() => {
    if (!data) return null;

    return {
      // Market Overview
      marketOverview: {
        totalMarketCap: formatCurrency(data.totalMarketCap),
        averagePrice: formatCurrency(data.averagePrice),
        totalCoins: formatNumber(data.coins.length),
        topGainersCount: `${data.topGainers.length} coins`
      },
      
      // Top Gainers (processed for display)
      topGainers: data.topGainers.slice(0, 5).map(coin => ({
        name: coin.name,
        symbol: coin.symbol,
        change: coin.price_change_percentage_24h,
        price: formatCurrency(coin.current_price),
        changeFormatted: formatPercentage(coin.price_change_percentage_24h)
      })),
      
      // Top Losers (processed for display)
      topLosers: data.topLosers.slice(0, 5).map(coin => ({
        name: coin.name,
        symbol: coin.symbol,
        change: coin.price_change_percentage_24h,
        price: formatCurrency(coin.current_price),
        changeFormatted: formatPercentage(coin.price_change_percentage_24h)
      })),
      
      // Top Coins by Market Cap
      topByMarketCap: data.coins.slice(0, 5).map((coin, index) => ({
        name: coin.name,
        symbol: coin.symbol,
        marketCap: formatCurrency(coin.market_cap),
        price: formatCurrency(coin.current_price),
        rank: index + 1
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
      // Overview Stats
      overview: {
        totalRepos: formatNumber(data.totalRepos),
        totalStars: formatNumber(data.totalStars),
        totalForks: formatNumber(data.totalForks),
        averageStars: formatNumber(data.averageStars)
      },
      
      // Chart Data
      chartData: {
        languages: Object.entries(data.topLanguages)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 8)
          .map(([language, count]) => ({
            language: language === 'Unknown' ? 'Other' : language,
            count,
            percentage: Math.round((count / data.totalRepos) * 100)
          })),
        
        starsVsForks: data.topRepos.slice(0, 10).map((repo, index) => ({
          name: repo.name.length > 15 ? repo.name.substring(0, 15) + '...' : repo.name,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          rank: index + 1
        }))
      },
      
      // Repository Data
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

  const processedData = useMemo(() => {
    if (!data) return null;

    return {
      // City Info
      cityInfo: {
        name: data.city,
        country: data.country,
        timezone: data.timezone,
        lastUpdated: data.timestamp
      },
      
      // Weather Stats
      weatherStats: {
        temperature: data.temperature,
        feelsLike: data.feelsLike,
        humidity: data.humidity,
        pressure: data.pressure,
        windSpeed: data.windSpeed,
        description: data.description,
        units: data.units
      },
      
      // Formatted Values
      formatted: {
        temperature: `${data.temperature}°${data.units === 'metric' ? 'C' : 'F'}`,
        feelsLike: `${data.feelsLike}°${data.units === 'metric' ? 'C' : 'F'}`,
        humidity: `${data.humidity}%`,
        pressure: `${data.pressure} hPa`,
        windSpeed: `${data.windSpeed} ${data.units === 'metric' ? 'm/s' : 'mph'}`
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

  return {
    data: processedData,
    loading,
    error,
    search: searchWeather,
    clear: clearWeather,
    hasData: !!data
  };
}
