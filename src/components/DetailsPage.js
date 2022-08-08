import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import '../styles.css';

// Fields to pull from the IMDB TitleData object and the names to display them
// in our interface
const fieldsToShow = {
  plot: 'Plot',
  directors: 'Director',
  stars: 'Starring',
  genres: 'Genres',
  countries: 'Countries',
  releaseDate: 'Release Date',
  imDbRating: 'Rating',
};

function DetailsPage() {
  const params = useParams();
  const [titleData, setTitleData] = useState({});

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
  });

  const listDetails = [...Object.keys(fieldsToShow)].map((field) => (
    <div key={field}>
      <li>
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
        <img src={titleData.image} width='25%'></img>
        <div style={{ width: '50%' }}>
          <div className='detailsBox'>
            <ul>{listDetails}</ul>
            <div className='ratingBox'>
              <h4>Rate this movie:</h4>
              <ReactStars count={10} size={24} activeColor='#ffd700' />
            </div>
            <Link to='/search'>
              <button
                style={{ fontSize: '20px', marginTop: '20px', padding: '15px' }}
              >
                Back to search page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
