import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';

function DetailsPage() {
  const params = useParams();
  const [titleData, setTitleData] = useState({});

  const fieldsToShow = {
    plot: 'Plot',
    directors: 'Director',
    stars: 'Starring',
    genres: 'Genres',
    countries: 'Countries',
    releaseDate: 'Release Date',
  };

  const fetchTitleData = async () => {
    const res = await fetch(
      'https://imdb-api.com/API/Title/k_v3ejgbqw/' + params.id
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getTitleData = async () => {
      const data = await fetchTitleData();
      setTitleData(data);
    };
    getTitleData();
  }, []);

  const listDetails = [...Object.keys(fieldsToShow)].map((field) => (
    <div>
      <li key={field}>
        <p>
          <b>{fieldsToShow[field]}: </b>
          {titleData[field]}
        </p>
      </li>
    </div>
  ));

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{titleData.fullTitle}</h1>
      <div className='movieDetails'>
        <img src={titleData.image} width='350px'></img>
        <ul>{listDetails}</ul>
      </div>
    </div>
  );
}

export default DetailsPage;
