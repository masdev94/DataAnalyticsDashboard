import type { CryptoData, GitHubData, WeatherData, ApiResponse } from '../types/index.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  private async request<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      console.log('Making API request to:', `${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API response data:', data);
      return { data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('API request error:', message);
      return { error: message };
    }
  }

  // Cryptocurrency API
  async getCryptoData(): Promise<ApiResponse<CryptoData>> {
    return this.request<CryptoData>('/api/crypto');
  }

  // GitHub API
  async getGitHubData(): Promise<ApiResponse<GitHubData>> {
    return this.request<GitHubData>('/api/github');
  }

  // Weather API
  async getWeatherData(city: string): Promise<ApiResponse<WeatherData>> {
    console.log('Weather API called with city:', city);
    return this.request<WeatherData>(`/api/weather/${encodeURIComponent(city)}`);
  }

  // Health check
  async getHealth(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

export const apiService = new ApiService();
export default apiService;
