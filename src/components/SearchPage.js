import SearchTable from './SearchTable';
import SearchInputs from './SearchInputs';
import { useState, useEffect } from 'react';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [queryParams, setQueryParams] = useState({
    yearMin: 1900,
    yearMax: 2022,
    country: null,
  });

  const runSearchQuery = async () => {
    const params = new URLSearchParams({
      title_type: 'feature',
      user_rating: '1.0,3.0',
      count: '100',
      release_date: `${queryParams.yearMin},${queryParams.yearMax}`,
    });
    if (queryParams.country !== null) {
      params.append('countries', queryParams.country);
    }
    console.log(params.toString());
    const res = await fetch(
      'https://imdb-api.com/API/AdvancedSearch/k_v3ejgbqw?' + params
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
