// Format currency values
export function formatCurrency(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
}

// Format numbers for display
export function formatNumber(value: number): string {
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  } else {
    return value.toString();
  }
}

// Format percentage changes with color
export function formatPercentage(value: number): { text: string; color: string; icon: string } {
  const formatted = value.toFixed(2);
  const color = value >= 0 ? '#10b981' : '#ef4444';
  const icon = value >= 0 ? '↗' : '↘';
  
  return {
    text: `${icon} ${formatted}%`,
    color,
    icon,
  };
}

// Format timestamp
export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString();
}

// Format temperature
export function formatTemperature(temp: number): string {
  return `${temp.toFixed(1)}°C`;
}

// Format pressure
export function formatPressure(pressure: number): string {
  return `${pressure} hPa`;
}

// Format wind speed
export function formatWindSpeed(speed: number): string {
  return `${speed} m/s`;
}

// Format humidity
export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}
