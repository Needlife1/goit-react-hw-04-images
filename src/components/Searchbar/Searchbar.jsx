import { useState, useEffect } from 'react';
import { SearchbarStyled } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export const Searchbar = ({ inputValue, getPictures }) => {
  const [newInputValue, setNewInputValue] = useState('');

  const getValue = e => {
    setNewInputValue(e.target.value.toLowerCase());
  };

  const handleInputChenge = e => {
    e.preventDefault();
    if (getPictures && newInputValue !== inputValue) {
      getPictures(newInputValue);
    }
  };

  useEffect(() => {
    if (inputValue !== newInputValue) {
      setNewInputValue(inputValue);
    }
  }, [inputValue]);

  return (
    <SearchbarStyled className="searchbar">
      <form className="SearchForm" onSubmit={handleInputChenge}>
        <button type="submit" className="SearchForm-button">
          <ImSearch />
        </button>

        <input
          className="SearchForm-input"
          onChange={getValue}
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
