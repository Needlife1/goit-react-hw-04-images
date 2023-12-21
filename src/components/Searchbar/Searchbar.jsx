import React, { useState, useEffect } from 'react';
import { SearchbarStyled } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export const Searchbar = ({ inputValue, getPictures }) => {
  const [newInputValue, setNewInputValue] = useState('');

  const handleChange = e => {
    setNewInputValue(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (getPictures && newInputValue.trim() !== inputValue.trim()) {
      getPictures(newInputValue);
    }
  };

  useEffect(() => {
    setNewInputValue(prev => {
      if (prev.trim() !== inputValue.trim()) {
        return inputValue;
      }
      return prev;
    });
  }, [inputValue]);

  return (
    <SearchbarStyled className="searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <ImSearch />
        </button>

        <input
          className="SearchForm-input"
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={newInputValue}
        />
      </form>
    </SearchbarStyled>
  );
};
