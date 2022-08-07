import SearchTable from './SearchTable';
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
    const res = await fetch('https://imdb-api.com/en/API/Search/k_v3ejgbqw/ace%20ventura')
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
      <p>{JSON.stringify(movies, null, 4)}</p>
      {/* <SearchTable columns={columns} data={movies}/> */}
    </div>
  );
}

export default SearchPage;
