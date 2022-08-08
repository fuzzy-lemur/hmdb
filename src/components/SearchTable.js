import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const columns = [
  {
    name: 'ID',
    selector: (row) => row.id,
  },
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: 'Year of release',
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: 'Rating',
    selector: (row) => row.imDbRating,
    sortable: true,
  },
  {
    cell: (row) => (
      <Link to={'/details/' + row.id}>
        <button>View details</button>
      </Link>
    ),
  },
];

function SearchTable({ data }) {
  return <DataTable columns={columns} data={data} pagination />;
}

export default SearchTable;
