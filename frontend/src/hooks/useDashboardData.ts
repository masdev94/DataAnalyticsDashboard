import { useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { apiService } from '../services/api';

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
