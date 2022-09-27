import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const { setRadioValue, handleFetchSearch } = useContext(RecipesContext);
  const [search, setSearch] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleRadio = ({ target: { value } }) => {
    setRadioValue(value);
  };

  return (

    <div data-testid="search-bar-content">

      <input
        placeholder="Faça sua busca"
        type="text"
        data-testid="search-input"
        value={ search }
        onChange={ handleChange }
      />

      <button
        type="button"
        data-testid="exec-search-btn"
        value={ search }
        onClick={ () => handleFetchSearch(search) }
      >
        Buscar
      </button>
      <input
        type="radio"
        name="filter"
        data-testid="ingredient-search-radio"
        value="ingredient"
        onChange={ handleRadio }
      />
      Ingrediente
      <input
        type="radio"
        name="filter"
        data-testid="name-search-radio"
        value="name"
        onChange={ handleRadio }
      />
      Nome
      <input
        type="radio"
        name="filter"
        data-testid="first-letter-search-radio"
        value="firstLetter"
        onChange={ handleRadio }
      />
      Primeira letra
    </div>
  );
}

export default SearchBar;
