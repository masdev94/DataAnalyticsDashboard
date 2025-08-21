import { useState } from 'react';
import { Card } from '../ui/Card';
import { AutocompleteSearch } from '../ui/AutocompleteSearch';
import { useWeatherSection } from '../../hooks/useDashboardData';

import { 
  FaCloudSun, 
  FaTimes, 
  FaExclamationTriangle, 
  FaSpinner, 
  FaInfoCircle,
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
  FaBolt,
  FaThermometerHalf,
  FaThermometerEmpty,
  FaTint,
  FaCompressAlt,
  FaWind,
  FaClock,
  FaMapMarkerAlt,
  FaSyncAlt
} from 'react-icons/fa';

export function WeatherSection() {
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const { 
    data, 
    loading, 
    error, 
    search, 
    clear, 
    refresh, 
    hasData, 
    userLocation, 
    isDetectingLocation 
  } = useWeatherSection();

  const handleClear = () => {
    clear();
  };

  const toggleUnits = () => {
    setUnits(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear') || desc.includes('sunny')) return <FaSun />;
    if (desc.includes('cloudy') || desc.includes('overcast')) return <FaCloud />;
    if (desc.includes('rain') || desc.includes('drizzle')) return <FaCloudRain />;
    if (desc.includes('snow')) return <FaSnowflake />;
    if (desc.includes('fog') || desc.includes('mist')) return <FaSmog />;
    if (desc.includes('thunder')) return <FaBolt />;
    return <FaCloudSun />;
  };

  const getTemperatureDisplay = (temp: number) => {
    if (units === 'imperial') {
      const fahrenheit = (temp * 9/5) + 32;
      return `${Math.round(fahrenheit)}°F`;
    }
    return `${temp}°C`;
  };

  const getWindSpeedDisplay = (speed: number) => {
    if (units === 'imperial') {
      const mph = speed * 2.237;
      return `${Math.round(mph)} mph`;
    }
    return `${speed} km/h`;
  };

  return (
    <Card 
      title="Weather Information" 
      icon={<FaCloudSun />} 
      onRefresh={refresh}
      loading={loading}
      showRefresh={hasData}
    >
      {/* Location Detection Status */}
      {isDetectingLocation && (
        <div style={{ 
          textAlign: 'center', 
          padding: '1rem', 
          backgroundColor: '#f0f9ff', 
          borderRadius: '0.5rem',
          border: '1px solid #bae6fd',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          color: '#0369a1'
        }}>
          <FaSpinner className="fa-spin" style={{ marginRight: '0.5rem' }} />
          Detecting your location...
        </div>
      )}

      {/* User Location Display */}
      {userLocation && !isDetectingLocation && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.75rem', 
          backgroundColor: '#f0fdf4', 
          borderRadius: '0.5rem',
          border: '1px solid #bbf7d0',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          color: '#166534'
        }}>
          <FaMapMarkerAlt />
          <span>Your location: <strong>{userLocation}</strong></span>
          <button 
            onClick={refresh}
            className="btn-secondary"
            style={{ 
              marginLeft: 'auto', 
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem'
            }}
            title="Refresh weather for your location"
          >
            <FaSyncAlt />
          </button>
        </div>
      )}

      {/* Search Controls */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <AutocompleteSearch 
            onSearch={search}
            placeholder="Search for a city..."
            disabled={loading}
          />
        </div>
        
        {hasData && (
          <button onClick={handleClear} className="btn-secondary">
            <FaTimes /> Clear
          </button>
        )}
        
        <button 
          onClick={toggleUnits} 
          className="btn-secondary"
          style={{ minWidth: '80px' }}
        >
          {units === 'metric' ? '°C' : '°F'}
        </button>
      </div>

      <div style={{ minHeight: '200px' }}>
        {error && (
          <div className="error">
            <FaExclamationTriangle style={{ marginRight: '0.5rem' }} />
            Error: {error}
          </div>
        )}
        
        {!hasData && !error && !loading && !isDetectingLocation && (
          <div style={{ 
            textAlign: 'center', 
            color: '#6b7280', 
            fontStyle: 'italic', 
            padding: '2rem 0',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            border: '2px dashed #d1d5db'
          }}>
            <FaMapMarkerAlt style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block', color: '#9ca3af' }} />
            <p>Weather information will be automatically loaded for your location</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Or search for any city above</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#9ca3af' }}>Powered by Open-Meteo API</p>
          </div>
        )}
        
        {loading && !isDetectingLocation && (
          <div className="loading">
            <FaSpinner style={{ marginRight: '0.5rem' }} />
            Loading weather data...
          </div>
        )}
        
        {hasData && data && (
          <div>
            {/* City Header */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f0f9ff',
              borderRadius: '0.75rem',
              border: '1px solid #bae6fd'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                color: '#0369a1',
                marginBottom: '0.5rem'
              }}>
                {getWeatherIcon(data.weatherStats.description)} {data.cityInfo.name}, {data.cityInfo.country}
              </h3>
              <p style={{ 
                fontSize: '1.125rem', 
                color: '#0c4a6e',
                marginBottom: '0.25rem'
              }}>
                {data.weatherStats.description}
              </p>
                             <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                 Local Timezone: {data.cityInfo.timezone} • Local Time: {data.cityInfo.localTime}
               </p>
            </div>

            {/* Main Weather Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem 1rem', 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '2rem', color: '#dc2626', marginBottom: '0.5rem' }}>
                  <FaThermometerHalf />
                </div>
                <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Temperature</div>
                                 <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                   {getTemperatureDisplay(data.weatherStats.temperature)}
                 </div>
              </div>

              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem 1rem', 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  <FaThermometerEmpty />
                </div>
                <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Feels Like</div>
                                 <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                   {getTemperatureDisplay(data.weatherStats.feelsLike)}
                 </div>
              </div>

              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem 1rem', 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '0.5rem' }}>
                  <FaTint />
                </div>
                <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Humidity</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                  {data.formatted.humidity}
                </div>
              </div>

              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem 1rem', 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                  <FaCompressAlt />
                </div>
                <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Pressure</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                  {data.formatted.pressure}
                </div>
              </div>

              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem 1rem', 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '2rem', color: '#10b981', marginBottom: '0.5rem' }}>
                  <FaWind />
                </div>
                <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Wind Speed</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                   {getWindSpeedDisplay(data.weatherStats.windSpeed)}
                 </div>
              </div>

              <div style={{ 
                textAlign: 'center', 
                padding: '1.5rem 1rem', 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '2rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  <FaClock />
                </div>
                <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Updated</div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                   {data.cityInfo.localTime}
                 </div>
              </div>
            </div>

            {/* API Info Footer */}
            <div style={{ 
              textAlign: 'center', 
              padding: '0.75rem', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '0.5rem',
              border: '1px solid #bbf7d0',
              fontSize: '0.875rem',
              color: '#166534'
            }}>
              <FaInfoCircle style={{ marginRight: '0.5rem' }} />
                Weather data provided by Open-Meteo API • Units: {units.toUpperCase()} • Local Timezone: {data.cityInfo.timezone} • Local Time: {data.cityInfo.localTime}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
