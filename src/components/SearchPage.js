import SearchTable from './SearchTable';

const columns = [
  {
      name: 'Title',
      selector: row => row.title,
  },
  {
      name: 'Year',
      selector: row => row.year,
  },
];

const data = [
  {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
  },
  {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
  },
  {
    id: 3,
    title: 'Foobar',
    year: '1984',
},
]

function SearchPage() {
  return (
    <div>
      <h3>This is the search page</h3>
      <SearchTable columns={columns} data={data}/>
    </div>
  );
}

export default SearchPage;
