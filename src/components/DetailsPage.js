import { useParams } from 'react-router-dom';

function DetailsPage() {
  const params = useParams();

  return (
    <div>
      <h1>This is the details page</h1>
      <h1>{params.id}</h1>
    </div>
  );
}

export default DetailsPage;
