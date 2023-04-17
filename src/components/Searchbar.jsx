import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
