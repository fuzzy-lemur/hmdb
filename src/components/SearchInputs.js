import { useState } from 'react';

function SearchInputs({ onChangeInputs }) {
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onChangeInputs({ yearMin, yearMax });
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
      </div>
      <input type='submit' value='Submit' />
    </form>
  );
}

export default SearchInputs;
