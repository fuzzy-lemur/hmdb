import DataTable from 'react-data-table-component';

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

function SearchTable({ data }) {
  return (
    <DataTable
        columns={columns}
        data={data}
        pagination
    />
  );
};

export default SearchTable;
