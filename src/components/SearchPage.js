import SearchTable from './SearchTable';
import { useState, useEffect } from 'react';
import { countries } from 'country-data';

const countriesSorted = countries.all.sort(function (a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});

const countryOptions = countriesSorted.map(({ name, alpha2 }) => (
  <option value={alpha2}>{name}</option>
));

// The API call params that stay fixed
const fixedQueryParams = {
  title_type: 'feature',
  user_rating: '1.0,3.0',
  count: process.env.REACT_APP_MAX_RESULTS,
};

// Default values for the params that are user-controlled and kept as a state
const defaultQueryParams = {
  yearMin: 1900,
  yearMax: 2022,
  country: '',
};

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [queryParams, setQueryParams] = useState(defaultQueryParams);

  const onSubmit = async (e) => {
    e.preventDefault();
    runSearchQuery();
  };

  const runSearchQuery = async () => {
    const params = new URLSearchParams({
      ...fixedQueryParams,
      release_date: `${queryParams.yearMin},${queryParams.yearMax}`,
    });
    if (queryParams.country !== '') {
      params.append('countries', queryParams.country);
    }
    console.log(params.toString());

    try {
      const response = await fetch(
        `https://imdb-api.com/API/AdvancedSearch/${process.env.REACT_APP_API_KEY}?` +
          params
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();
      const results = data.results;
      if (results === null) {
        throw new Error('Empty results');
      }
      setSearchResults(results);
      window.localStorage.setItem('hmdbSearchResults', JSON.stringify(results));
      window.localStorage.setItem(
        'hmdbQueryParams',
        JSON.stringify(queryParams)
      );
    } catch (err) {
      console.log(err);
    }
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
    <div className='searchPage'>
      <div className='searchFilters'>
        <h3>Search filters</h3>
        <form onSubmit={onSubmit}>
          <div>
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
            </div>
            <div>
              <label>
                Choose a country:
                <select
                  type='string'
                  value={queryParams.country}
                  onChange={(e) =>
                    setQueryParams({ ...queryParams, country: e.target.value })
                  }
                >
                  <option value={''}>-</option>
                  {countryOptions}
                </select>
              </label>
            </div>
          </div>
          <input type='submit' value='Apply Filters' />
        </form>
      </div>
      <div>
        <SearchTable data={searchResults} />
      </div>
    </div>
  );
}

export default SearchPage;
