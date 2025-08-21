import type { CitySuggestion } from '../data/citiesSchema';

export const generateCitySuggestions = (
  searchQuery: string, 
  cities: CitySuggestion[], 
  maxResults: number = 8
): CitySuggestion[] => {
  if (searchQuery.length < 2) return [];

  const query = searchQuery.toLowerCase();
  const results: CitySuggestion[] = [];

  // Search in popular cities
  cities.forEach(city => {
    if (city.name.toLowerCase().includes(query) || 
        city.country.toLowerCase().includes(query)) {
      results.push(city);
    }
  });

  // Add dynamic suggestions if needed
  if (results.length < maxResults) {
    const dynamicSuggestions: CitySuggestion[] = [
      { 
        name: `${searchQuery} City`, 
        country: 'Search Results', 
        displayName: `${searchQuery} City, Search Results` 
      },
      { 
        name: `New ${searchQuery}`, 
        country: 'Search Results', 
        displayName: `New ${searchQuery}, Search Results` 
      }
    ];

    dynamicSuggestions.forEach(suggestion => {
      if (!results.some(r => r.name === suggestion.name)) {
        results.push(suggestion);
      }
    });
  }

  return results.slice(0, maxResults);
};

export const saveRecentSearch = (city: string, maxRecent: number = 5): string[] => {
  try {
    const saved = localStorage.getItem('recentCitySearches');
    const recentSearches = saved ? JSON.parse(saved) : [];
    const updated = [city, ...recentSearches.filter((s: string) => s !== city)].slice(0, maxRecent);
    localStorage.setItem('recentCitySearches', JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.log('Error saving recent search:', error);
    return [];
  }
};

export const loadRecentSearches = (): string[] => {
  try {
    const saved = localStorage.getItem('recentCitySearches');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.log('Error loading recent searches:', error);
    return [];
  }
};