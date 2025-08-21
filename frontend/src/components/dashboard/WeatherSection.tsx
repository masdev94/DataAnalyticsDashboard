import { useState } from 'react';
import { Card } from '../ui/Card';
import { useWeatherData } from '../../hooks/useDashboardData';
import { 
  formatTemperature, 
  formatPressure, 
  formatWindSpeed, 
  formatHumidity,
  formatTimestamp 
} from '../../utils/formatters';

export function WeatherSection() {
  const [cityInput, setCityInput] = useState('');
  const { data, loading, error, fetch, clear } = useWeatherData();

  const handleSearch = () => {
    if (cityInput.trim()) {
      fetch(cityInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setCityInput('');
    clear();
  };

  return (
    <Card title="Weather Information" icon="fas fa-cloud-sun">
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name..."
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
        <button 
          onClick={handleSearch} 
          className="btn-primary"
          disabled={loading}
        >
          <i className="fas fa-search"></i>
          {loading ? ' Loading...' : ' Search'}
        </button>
        {data && (
          <button onClick={handleClear} className="btn-secondary">
            <i className="fas fa-times"></i> Clear
          </button>
        )}
      </div>

      <div style={{ minHeight: '200px' }}>
        {error && <div className="error">Error: {error}</div>}
        
        {!data && !error && !loading && (
          <p style={{ textAlign: 'center', color: '#6b7280', fontStyle: 'italic', padding: '2rem 0' }}>
            Enter a city to see weather information
          </p>
        )}
        
        {loading && <div className="loading">Loading weather data...</div>}
        
        {data && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Location</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{data.city}, {data.country}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Temperature</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{formatTemperature(data.temperature)}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Feels Like</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{formatTemperature(data.feelsLike)}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Humidity</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{formatHumidity(data.humidity)}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Pressure</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{formatPressure(data.pressure)}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Wind Speed</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{formatWindSpeed(data.windSpeed)}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Description</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', textTransform: 'capitalize' }}>{data.description}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Last Updated</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{formatTimestamp(data.timestamp)}</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
