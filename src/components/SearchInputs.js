import { useState } from 'react';
import Select from 'react-select';
import { countries } from 'country-data';

const allCountryNames = countries.all.map(({ name, alpha2 }) => ({
  value: alpha2,
  label: name,
}));

function SearchInputs({ onChangeInputs }) {
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');
  const [country, setCountry] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onChangeInputs({ yearMin, yearMax, country });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          From year :
          <input
            type='number'
            min='1900'
            max='2022'
            value={yearMin}
            onChange={(e) => setYearMin(e.target.value)}
          />
        </label>
        <label>
          To :
          <input
            type='number'
            min='1900'
            max='2022'
            value={yearMax}
            onChange={(e) => setYearMax(e.target.value)}
          />
        </label>
        <label>
          Country:
          <Select
            options={allCountryNames}
            isClearable='true'
            onChange={(e) => setCountry(e.value)}
          />
        </label>
      </div>
      <input type='submit' value='Submit' />
    </form>
  );
}

export default SearchInputs;
