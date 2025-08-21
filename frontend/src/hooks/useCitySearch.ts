import { useState, useEffect, useCallback } from 'react';
import type { CitySuggestion } from '../data/citiesSchema';
import { generateCitySuggestions, saveRecentSearch, loadRecentSearches } from '../utils/searchUtils';

export const useCitySearch = (cities: CitySuggestion[]) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRecentSearches(loadRecentSearches());
  }, []);

  const updateSuggestions = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        const newSuggestions = generateCitySuggestions(searchQuery, cities);
        setSuggestions(newSuggestions);
        setLoading(false);
      }, 200);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, [cities]);

  const handleSuggestionSelect = useCallback((suggestion: CitySuggestion) => {
    const updatedRecent = saveRecentSearch(suggestion.displayName);
    setRecentSearches(updatedRecent);
    return suggestion;
  }, []);

  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      const updatedRecent = saveRecentSearch(searchQuery.trim());
      setRecentSearches(updatedRecent);
    }
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    recentSearches,
    loading,
    updateSuggestions,
    handleSuggestionSelect,
    handleSearch
  };
};