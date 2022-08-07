import DataTable from 'react-data-table-component';

function SearchTable({ columns, data }) {
    return (
      <p>{data.keys}</p>
/*         <DataTable
            columns={columns}
            data={data}
        /> */
    );
};

export default SearchTable;
