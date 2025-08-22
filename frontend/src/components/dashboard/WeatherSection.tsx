import { useWeatherSection } from '../../hooks/useDashboardData';
import { Card } from '../ui/Card';
import { StatsGrid } from '../ui/StatsGrid';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage, NoDataFound } from '../ui/ErrorMessage';
import { AutocompleteSearch } from '../ui/AutocompleteSearch';
import { 
  FaCloudSun, 
  FaThermometerHalf, 
  FaTint, 
  FaWind,
  FaMapMarkerAlt,
  FaClock,
  FaGlobe,
  FaSyncAlt,
  FaThermometerEmpty,
  FaThermometerFull
} from 'react-icons/fa';
import { useState } from 'react';

export function WeatherSection() {
  const { data, loading, error, hasData, userLocation, search } = useWeatherSection();
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  // Handle loading state with spinner
  if (loading) {
    return (
      <Card title="Weather Information" icon={<FaCloudSun />}>
        <LoadingSpinner 
          size="large" 
          text="Loading weather information..." 
        />
      </Card>
    );
  }

  // Handle error state gracefully
  if (error) {
    return (
      <Card title="Weather Information" icon={<FaCloudSun />}>
        <ErrorMessage 
          error={error} 
          onRetry={() => search(userLocation?.split(',')[0] || 'London')}
          variant="error"
        />
      </Card>
    );
  }

  // Handle no data state
  if (!hasData || !data) {
    return (
      <Card title="Weather Information" icon={<FaCloudSun />}>
        <NoDataFound 
          message="No weather data available. Search for a city to get started."
          onRefresh={() => search(userLocation?.split(',')[0] || 'London')}
        />
      </Card>
    );
  }

  // Unit conversion helpers
  const getTemperatureDisplay = (temp: number) => {
    if (units === 'imperial') {
      const fahrenheit = (temp * 9/5) + 32;
      return `${fahrenheit.toFixed(1)}°F`;
    }
    return `${temp.toFixed(1)}°C`;
  };

  const getWindSpeedDisplay = (speed: number) => {
    if (units === 'imperial') {
      const mph = speed * 2.237;
      return `${mph.toFixed(1)} mph`;
    }
    return `${speed.toFixed(1)} km/h`;
  };

  const handleSearch = (city: string) => {
    const cityName = city.split(',')[0].trim();
    search(cityName);
  };

  const handleRefresh = () => {
    if (data.cityInfo.name) {
      search(data.cityInfo.name);
    }
  };

  return (
    <Card title="Weather Information" icon={<FaCloudSun />} onRefresh={handleRefresh} loading={loading}>
      {/* Search and Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '0.75rem',
        border: '1px solid #e2e8f0',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <AutocompleteSearch onSearch={handleSearch} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Unit Toggle */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem',
            backgroundColor: 'white',
            borderRadius: '0.375rem',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Units:</span>
            <button
              onClick={() => setUnits('metric')}
              style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: units === 'metric' ? '#3b82f6' : 'transparent',
                color: units === 'metric' ? 'white' : '#6b7280',
                border: 'none',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <FaThermometerEmpty style={{ marginRight: '0.25rem' }} />
              Metric
            </button>
            <button
              onClick={() => setUnits('imperial')}
              style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: units === 'imperial' ? '#3b82f6' : 'transparent',
                color: units === 'imperial' ? 'white' : '#6b7280',
                border: 'none',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <FaThermometerFull style={{ marginRight: '0.25rem' }} />
              Imperial
            </button>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <FaSyncAlt />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Location and Time Info */}
      <div style={{ 
        backgroundColor: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.75rem',
        border: '1px solid #bfdbfe',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <FaMapMarkerAlt style={{ color: '#3b82f6', fontSize: '1.5rem' }} />
          <h2 style={{ 
            color: '#1e40af', 
            fontSize: '1.5rem', 
            fontWeight: '600',
            margin: 0
          }}>
            {data.cityInfo.name}, {data.cityInfo.country}
          </h2>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '0.75rem',
          fontSize: '1rem',
          color: '#1e40af'
        }}>
          <FaClock />
          <span>Local Time: {data.cityInfo.localTime}</span>
          <FaGlobe />
          <span>Timezone: {data.cityInfo.timezone}</span>
        </div>
      </div>

      {/* Weather Stats Grid */}
      <StatsGrid 
        items={[
          {
            label: 'Temperature',
            value: getTemperatureDisplay(data.weatherStats.temperature),
            icon: <FaThermometerHalf />,
            className: 'bg-red-50',
            color: 'text-red-700'
          },
          {
            label: 'Feels Like',
            value: getTemperatureDisplay(data.weatherStats.feelsLike),
            icon: <FaThermometerHalf />,
            className: 'bg-orange-50',
            color: 'text-orange-700'
          },
          {
            label: 'Humidity',
            value: `${data.weatherStats.humidity}%`,
            icon: <FaTint />,
            className: 'bg-blue-50',
            color: 'text-blue-700'
          },
          {
            label: 'Wind Speed',
            value: getWindSpeedDisplay(data.weatherStats.windSpeed),
            icon: <FaWind />,
            className: 'bg-green-50',
            color: 'text-green-700'
          }
        ]}
        columns={4}
      />

      {/* Weather Description and Details */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1.5rem', 
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ 
          fontSize: '2rem', 
          color: '#3b82f6', 
          marginBottom: '1rem'
        }}>
          <FaCloudSun />
        </div>
        
        <h3 style={{ 
          color: '#1f2937', 
          fontSize: '1.5rem', 
          fontWeight: '600',
          marginBottom: '0.5rem'
        }}>
          {data.weatherStats.description}
        </h3>
        
        <p style={{ 
          color: '#6b7280', 
          fontSize: '1rem',
          margin: 0
        }}>
          Current weather conditions in {data.cityInfo.name}
        </p>
      </div>

      {/* Additional Weather Details */}
      <div style={{ 
        backgroundColor: '#f8fafc', 
        padding: '1.5rem', 
        borderRadius: '0.75rem',
        border: '1px solid #e2e8f0',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ 
          color: '#1e293b', 
          fontSize: '1.25rem', 
          fontWeight: '600',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaCloudSun />
          Weather Details
        </h3>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Pressure
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f293b' }}>
              {data.weatherStats.pressure} hPa
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Last Updated
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f293b' }}>
              {new Date(data.cityInfo.lastUpdated).toLocaleTimeString()}
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Units
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f293b' }}>
              {units === 'metric' ? 'Metric (°C, m/s)' : 'Imperial (°F, mph)'}
            </div>
          </div>
        </div>
      </div>

      {/* API Info Footer */}
      <div style={{ 
        textAlign: 'center', 
        padding: '1rem', 
        backgroundColor: '#f0fdf4', 
        borderRadius: '0.75rem',
        border: '1px solid #bbf7d0',
        fontSize: '0.875rem',
        color: '#166534',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <FaGlobe />
        Data provided by Open-Meteo API • Location: {data.cityInfo.name}, {data.cityInfo.country} • 
        Timezone: {data.cityInfo.timezone} • 
        Last updated: {new Date().toLocaleString()}
      </div>
    </Card>
  );
}
