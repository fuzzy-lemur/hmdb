import SearchTable from './SearchTable';
import SearchInputs from './SearchInputs';
import { useState, useEffect } from 'react';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [queryParams, setQueryParams] = useState({
    yearMin: 2000,
    yearMax: 2002,
  });

  const runSearchQuery = async () => {
    const res = await fetch(
      'https://imdb-api.com/API/AdvancedSearch/k_v3ejgbqw?' +
        new URLSearchParams({
          title_type: 'feature',
          user_rating: '1.0,3.0',
          count: '100',
          release_date: `${queryParams.yearMin},${queryParams.yearMax}`,
        })
    );
    const data = await res.json();
    const results = data.results;
    setSearchResults(results);
    window.localStorage.setItem('hmdbSearchResults', JSON.stringify(results));
  };

  useEffect(() => {
    runSearchQuery();
  }, [queryParams]);

  // Load previous search results from localStorage if possible
  useEffect(() => {
    const local = window.localStorage.getItem('hmdbSearchResults');
    if (local !== null) {
      setSearchResults(JSON.parse(local));
    }
  }, []);

  return (
    <div>
      <h3>This is the search page</h3>
      <SearchInputs onChangeInputs={setQueryParams} />
      <SearchTable data={searchResults} />
    </div>
  );
}

export default SearchPage;
