import DataTable from 'react-data-table-component';

function SearchTable({ columns, data }) {
    return (
      <DataTable
          columns={columns}
          data={data}
          pagination
      />
    );
};

export default SearchTable;
