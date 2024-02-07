import React from 'react';

import css from "../styles/SearchInput.css"

const SearchInput = ({ city, setCity, onKeyPress }) => {
  return (
    <div className='search-box'>
      <input
        type='text'
        className='search-bar'
        placeholder='Please input the city, press enter...'
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default SearchInput;