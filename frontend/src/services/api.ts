import type { CryptoData, GitHubData, WeatherData, ApiResponse } from '../types/index.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const IP_GEOLOCATION_API = import.meta.env.VITE_IP_GEOLOCATION_API || 'https://ipapi.co/json/';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');
const ENABLE_DEBUG_LOGGING = import.meta.env.VITE_ENABLE_DEBUG_LOGGING === 'true';

class ApiService {
  private async request<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      if (ENABLE_DEBUG_LOGGING) {
        console.log('Making API request to:', `${API_BASE_URL}${endpoint}`);
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (ENABLE_DEBUG_LOGGING) {
        console.log('API response status:', response.status);
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (ENABLE_DEBUG_LOGGING) {
        console.log('API response data:', data);
      }
      return { data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('API request error:', message);
      return { error: message };
    }
  }

  async getCryptoData(): Promise<ApiResponse<CryptoData>> {
    return this.request<CryptoData>('/api/crypto');
  }

  async getGitHubData(): Promise<ApiResponse<GitHubData>> {
    return this.request<GitHubData>('/api/github');
  }

  async getWeatherData(city: string): Promise<ApiResponse<WeatherData>> {
    if (ENABLE_DEBUG_LOGGING) {
      console.log('Weather API called with city:', city);
    }
    
    return this.request<WeatherData>(`/api/weather/${encodeURIComponent(city)}`);
  }

  async getHealth(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }

  async getIpLocation(): Promise<any> {
    try {
      if (ENABLE_DEBUG_LOGGING) {
        console.log('Getting IP location from:', IP_GEOLOCATION_API);
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
      
      const response = await fetch(IP_GEOLOCATION_API, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (ENABLE_DEBUG_LOGGING) {
        console.log('IP location data:', data);
      }
      return { data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('IP location error:', message);
      return { error: message };
    }
  }
}

export const apiService = new ApiService();
export default apiService;
