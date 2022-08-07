import SearchTable from './SearchTable';
import SearchInputs from './SearchInputs';
import { useState, useEffect } from 'react'

const columns = [
  {
    name: 'ID',
    selector: row => row.id,
  }, 
  {
      name: 'Title',
      selector: row => row.title,
  },
  {
      name: 'Description',
      selector: row => row.description,
  },
];

function SearchPage() {

  const [movies, setMovies] = useState([])

  const runSearchQuery = async () => {
    const res = await fetch('https://imdb-api.com/API/AdvancedSearch/k_v3ejgbqw?title_type=feature&user_rating=1.0,2.0&moviemeter=0,&count=100')
    const data = await res.json()
    const results = data.results

    return results
  }
  
  useEffect(() => {
    const getMovies = async () => {
      const movies = await runSearchQuery()
      setMovies(movies)
    }
    getMovies()
  }, [])

  return (
    <div>
      <h3>This is the search page</h3>
      <SearchInputs />
      <SearchTable columns={columns} data={movies}/>
    </div>
  );
}

export default SearchPage;
