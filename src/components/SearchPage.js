import SearchTable from './SearchTable';
import { useState, useEffect } from 'react';
import { countries } from 'country-data';
import Select from 'react-select';

const listCountries = countries.all.map(({ name, alpha2 }) => (
  <option value={alpha2}>{name}</option>
));

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [queryParams, setQueryParams] = useState({
    yearMin: 1900,
    yearMax: 2022,
    country: undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    runSearchQuery();
  };

  const runSearchQuery = async () => {
    console.log('running query');
    const params = new URLSearchParams({
      title_type: 'feature',
      user_rating: '1.0,3.0',
      count: '100',
      release_date: `${queryParams.yearMin},${queryParams.yearMax}`,
    });
    if (queryParams.country !== undefined) {
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
    window.localStorage.setItem('hmdbQueryParams', JSON.stringify(queryParams));
  };

  // Load previous search results from localStorage if possible
  useEffect(() => {
    const localData = window.localStorage.getItem('hmdbSearchResults');
    if (localData !== null) {
      setSearchResults(JSON.parse(localData));
    } else {
      runSearchQuery();
    }
    const localParams = window.localStorage.getItem('hmdbQueryParams');
    if (localParams !== null) {
      setQueryParams(JSON.parse(localParams));
    }
  }, []);

  return (
    <div>
      <h3>This is the search page</h3>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              From year :
              <input
                type='number'
                min='1900'
                max='2022'
                value={queryParams.yearMin}
                onChange={(e) =>
                  setQueryParams({ ...queryParams, yearMin: e.target.value })
                }
              />
            </label>
            <label>
              To :
              <input
                type='number'
                min='1900'
                max='2022'
                value={queryParams.yearMax}
                onChange={(e) =>
                  setQueryParams({ ...queryParams, yearMax: e.target.value })
                }
              />
            </label>
            <label>
              Choose a country:
              <select
                type='string'
                value={queryParams.country}
                onChange={(e) =>
                  setQueryParams({ ...queryParams, country: e.target.value })
                }
              >
                <option value={null}>-</option>
                {listCountries}
              </select>
            </label>
          </div>
          <input type='submit' value='Submit' />
        </form>
      </div>
      <div>
        <SearchTable data={searchResults} />
      </div>
    </div>
  );
}

export default SearchPage;
