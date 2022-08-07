import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailsPage() {
  const params = useParams();
  const [titleData, setTitleData] = useState({});

  const fetchTitleData = async () => {
    const res = await fetch(
      'https://imdb-api.com/API/Title/k_v3ejgbqw/' + params.id
    );
    const data = await res.json();
    console.log(data);

    return data;
  };

  useEffect(() => {
    const getTitleData = async () => {
      const data = await fetchTitleData();
      setTitleData(data);
    };
    getTitleData();
  }, []);

  return (
    <div>
      <h1>This is the details page</h1>
      <h1>{JSON.stringify(titleData)}</h1>
    </div>
  );
}

export default DetailsPage;
