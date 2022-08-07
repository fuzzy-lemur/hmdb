import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailsPage() {
  const params = useParams();
  const [titleData, setTitleData] = useState({});

  const fieldsToShow = {
    directors: 'Director',
    stars: 'Starring',
    genres: 'Genres',
    plot: 'Plot',
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
      <p>
        <b>{fieldsToShow[field]}: </b>
        {titleData[field]}
      </p>
    </div>
  ));

  return (
    <div>
      <h1>{titleData.fullTitle}</h1>
      <img src={titleData.image} width='350px'></img>
      <ul>{listDetails}</ul>
    </div>
  );
}

export default DetailsPage;
