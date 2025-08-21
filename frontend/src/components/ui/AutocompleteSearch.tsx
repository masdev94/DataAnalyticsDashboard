import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  displayName: string;
}

interface AutocompleteSearchProps {
  onSearch: (city: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Popular cities database
const POPULAR_CITIES = [
  { name: 'Belgrade', country: 'Serbia', displayName: 'Belgrade, Serbia' },
  { name: 'London', country: 'United Kingdom', displayName: 'London, United Kingdom' },
  { name: 'New York', country: 'United States', displayName: 'New York, United States' },
  { name: 'Paris', country: 'France', displayName: 'Paris, France' },
  { name: 'Berlin', country: 'Germany', displayName: 'Berlin, Germany' },
  { name: 'Zagreb', country: 'Croatia', displayName: 'Zagreb, Croatia' },
  { name: 'Budapest', country: 'Hungary', displayName: 'Budapest, Hungary' },
  { name: 'Prague', country: 'Czech Republic', displayName: 'Prague, Czech Republic' },
  { name: 'Warsaw', country: 'Poland', displayName: 'Warsaw, Poland' },
  { name: 'Rome', country: 'Italy', displayName: 'Rome, Italy' },
  { name: 'Madrid', country: 'Spain', displayName: 'Madrid, Spain' },
  { name: 'Amsterdam', country: 'Netherlands', displayName: 'Amsterdam, Netherlands' },
  { name: 'Brussels', country: 'Belgium', displayName: 'Brussels, Belgium' },
  { name: 'Vienna', country: 'Austria', displayName: 'Vienna, Austria' },
  { name: 'Stockholm', country: 'Sweden', displayName: 'Stockholm, Sweden' },
  { name: 'Oslo', country: 'Norway', displayName: 'Oslo, Norway' },
  { name: 'Copenhagen', country: 'Denmark', displayName: 'Copenhagen, Denmark' },
  { name: 'Helsinki', country: 'Finland', displayName: 'Helsinki, Finland' },
  { name: 'Dublin', country: 'Ireland', displayName: 'Dublin, Ireland' },
  { name: 'Lisbon', country: 'Portugal', displayName: 'Lisbon, Portugal' },
  { name: 'Athens', country: 'Greece', displayName: 'Athens, Greece' },
  { name: 'Bucharest', country: 'Romania', displayName: 'Bucharest, Romania' },
  { name: 'Sofia', country: 'Bulgaria', displayName: 'Sofia, Bulgaria' },
  { name: 'Tallinn', country: 'Estonia', displayName: 'Tallinn, Estonia' },
  { name: 'Riga', country: 'Latvia', displayName: 'Riga, Latvia' },
  { name: 'Vilnius', country: 'Lithuania', displayName: 'Vilnius, Lithuania' },
  { name: 'Tokyo', country: 'Japan', displayName: 'Tokyo, Japan' },
  { name: 'Beijing', country: 'China', displayName: 'Beijing, China' },
  { name: 'Sydney', country: 'Australia', displayName: 'Sydney, Australia' },
  { name: 'Toronto', country: 'Canada', displayName: 'Toronto, Canada' },
  { name: 'Mumbai', country: 'India', displayName: 'Mumbai, India' },
  { name: 'Sao Paulo', country: 'Brazil', displayName: 'Sao Paulo, Brazil' },
  { name: 'Cairo', country: 'Egypt', displayName: 'Cairo, Egypt' },
  { name: 'Mexico City', country: 'Mexico', displayName: 'Mexico City, Mexico' },
  { name: 'Bangkok', country: 'Thailand', displayName: 'Bangkok, Thailand' },
  { name: 'Moscow', country: 'Russia', displayName: 'Moscow, Russia' },
  { name: 'Kiev', country: 'Ukraine', displayName: 'Kiev, Ukraine' },
  { name: 'Minsk', country: 'Belarus', displayName: 'Minsk, Belarus' },
  { name: 'Chisinau', country: 'Moldova', displayName: 'Chisinau, Moldova' },
  { name: 'Bratislava', country: 'Slovakia', displayName: 'Bratislava, Slovakia' },
  { name: 'Ljubljana', country: 'Slovenia', displayName: 'Ljubljana, Slovenia' },
  { name: 'Podgorica', country: 'Montenegro', displayName: 'Podgorica, Montenegro' },
  { name: 'Tirane', country: 'Albania', displayName: 'Tirane, Albania' },
  { name: 'Skopje', country: 'North Macedonia', displayName: 'Skopje, North Macedonia' },
  { name: 'Sarajevo', country: 'Bosnia and Herzegovina', displayName: 'Sarajevo, Bosnia and Herzegovina' }
];

export function AutocompleteSearch({ 
  onSearch, 
  placeholder = "Search for a city...", 
  disabled = false,
  className = ""
}: AutocompleteSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentCitySearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.log('Error loading recent searches:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (city: string) => {
    const updated = [city, ...recentSearches.filter(s => s !== city)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentCitySearches', JSON.stringify(updated));
  };

  // Generate suggestions based on query
  const generateSuggestions = (searchQuery: string): CitySuggestion[] => {
    if (searchQuery.length < 2) return [];

    const query = searchQuery.toLowerCase();
    const results: CitySuggestion[] = [];

    // Search in popular cities
    POPULAR_CITIES.forEach(city => {
      if (city.name.toLowerCase().includes(query) || 
          city.country.toLowerCase().includes(query)) {
        results.push(city);
      }
    });

    // Add dynamic suggestions
    if (results.length < 5) {
      const dynamicSuggestions: CitySuggestion[] = [
        { name: `${searchQuery} City`, country: 'Search Results', displayName: `${searchQuery} City, Search Results` },
        { name: `New ${searchQuery}`, country: 'Search Results', displayName: `New ${searchQuery}, Search Results` }
      ];

      dynamicSuggestions.forEach(suggestion => {
        if (!results.some(r => r.name === suggestion.name)) {
          results.push(suggestion);
        }
      });
    }

    return results.slice(0, 8);
  };

  // Update suggestions when query changes
  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        const newSuggestions = generateSuggestions(query);
        setSuggestions(newSuggestions);
        setLoading(false);
      }, 200);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionSelect(suggestions[selectedIndex]);
      } else if (query.trim()) {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: CitySuggestion) => {
    setQuery(suggestion.displayName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    saveRecentSearch(suggestion.displayName);
    onSearch(suggestion.displayName);
  };

  // Handle search submission
  const handleSearch = () => {
    if (query.trim()) {
      const searchQuery = query.trim();
      saveRecentSearch(searchQuery);
      onSearch(searchQuery);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Handle input focus
  const handleFocus = () => {
    setShowSuggestions(true);
  };

  // Handle input blur
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  return (
    <div className={`autocomplete-search ${className}`} style={{ position: 'relative', width: '100%' }}>
      {/* Search Input */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              transition: 'border-color 0.2s',
              backgroundColor: disabled ? '#f3f4f6' : 'white'
            }}
          />
          
          {/* Search Icon */}
          <div style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6b7280',
            pointerEvents: 'none'
          }}>
            <FaSearch />
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#3b82f6'
            }}>
              <div className="fa-spin" style={{ fontSize: '0.875rem' }}>⟳</div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="btn-primary"
          disabled={disabled || !query.trim()}
          style={{ 
            padding: '0.75rem 1rem',
            whiteSpace: 'nowrap'
          }}
        >
          <FaSearch />
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          maxHeight: '300px',
          overflowY: 'auto',
          marginTop: '0.25rem'
        }}>
          {/* Recent Searches */}
          {recentSearches.length > 0 && query.length < 2 && (
            <div>
              <div style={{
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#6b7280',
                backgroundColor: '#f9fafb',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <FaGlobe style={{ marginRight: '0.5rem' }} />
                Recent Searches
              </div>
              {recentSearches.map((recent, index) => (
                <div
                  key={`recent-${index}`}
                  onClick={() => {
                    setQuery(recent);
                    onSearch(recent);
                    setShowSuggestions(false);
                  }}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#374151',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                  onMouseEnter={() => setSelectedIndex(-1)}
                >
                  <FaMapMarkerAlt style={{ color: '#9ca3af', fontSize: '0.75rem' }} />
                  {recent}
                </div>
              ))}
            </div>
          )}

          {/* City Suggestions */}
          {suggestions.length > 0 && (
            <div>
              {recentSearches.length > 0 && query.length < 2 && (
                <div style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  backgroundColor: '#f9fafb',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <FaSearch style={{ marginRight: '0.5rem' }} />
                  Search Results
                </div>
              )}
              
              {suggestions.map((suggestion, index) => (
                <div
                  key={`suggestion-${index}`}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: selectedIndex === index ? 'white' : '#374151',
                    backgroundColor: selectedIndex === index ? '#3b82f6' : 'transparent',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <FaMapMarkerAlt 
                    style={{ 
                      color: selectedIndex === index ? 'white' : '#9ca3af', 
                      fontSize: '0.75rem' 
                    }} 
                  />
                  <div>
                    <div style={{ fontWeight: '500' }}>
                      {suggestion.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: selectedIndex === index ? 'rgba(255,255,255,0.8)' : '#6b7280' 
                    }}>
                      {suggestion.country}
                      {suggestion.state && `, ${suggestion.state}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {suggestions.length === 0 && query.length >= 2 && !loading && (
            <div style={{
              padding: '1rem',
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              No cities found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
