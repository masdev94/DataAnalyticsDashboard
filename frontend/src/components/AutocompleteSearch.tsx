import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import type { CitySuggestion } from '../data/citiesSchema';
import { useCitySearch } from '../hooks/useCitySearch';
import { POPULAR_CITIES } from '../data/citiesSchema';

interface AutocompleteSearchProps {
  onSearch: (city: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  cities?: CitySuggestion[];
}

export function AutocompleteSearch({ 
  onSearch, 
  placeholder = "Search for a city...", 
  disabled = false,
  className = "",
  cities = POPULAR_CITIES
}: AutocompleteSearchProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    query,
    setQuery,
    suggestions,
    recentSearches,
    loading,
    updateSuggestions,
    handleSuggestionSelect,
    handleSearch
  } = useCitySearch(cities);

  useEffect(() => {
    updateSuggestions(query);
  }, [query, updateSuggestions]);

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
        const suggestion = handleSuggestionSelect(suggestions[selectedIndex]);
        setQuery(suggestion.displayName);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        onSearch(suggestion.displayName);
      } else if (query.trim()) {
        handleSearch(query);
        onSearch(query.trim());
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    const selected = handleSuggestionSelect(suggestion);
    setQuery(selected.displayName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSearch(selected.displayName);
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      handleSearch(query);
      onSearch(query.trim());
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleFocus = () => setShowSuggestions(true);
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  return (
    <div className={`autocomplete-search ${className}`} style={{ position: 'relative', width: '100%' }}>
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

        <button 
          onClick={handleSearchClick}
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
                  onClick={() => handleSuggestionClick(suggestion)}
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