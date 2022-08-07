import SearchTable from './SearchTable';
import SearchInputs from './SearchInputs';
import { useState, useEffect } from 'react';

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [queryParams, setQueryParams] = useState({
    yearMin: 2000,
    yearMax: 2002,
  });

  const runSearchQuery = async () => {
    const res = await fetch(
      'https://imdb-api.com/API/AdvancedSearch/k_v3ejgbqw?' +
        new URLSearchParams({
          title_type: 'feature',
          user_rating: '1.0,2.0',
          count: '100',
          release_date: `${queryParams.yearMin}-01-01,${queryParams.yearMax}-01-01`,
        })
    );
    const data = await res.json();
    const results = data.results;

    return results;
  };

  useEffect(() => {
    const getMovies = async () => {
      const movies = await runSearchQuery();
      setMovies(movies);
    };
    getMovies();
  }, [queryParams]);

  return (
    <div>
      <h3>This is the search page!</h3>
      <SearchInputs onChangeInputs={setQueryParams} />
      <SearchTable data={movies} />
    </div>
  );
}

export default SearchPage;
