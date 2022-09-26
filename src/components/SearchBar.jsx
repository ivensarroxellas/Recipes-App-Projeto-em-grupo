import React, { useState } from 'react';
import { fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByFirstLetter } from '../service/fetch';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [radioValue, setradioValue] = useState('');

  const handleFetchSearch = async () => {
    switch (radioValue) {
    case 'ingredient':
      await fetchMealsByIngredient(search);
      break;

    case 'name':
      await fetchMealsByName(search);
      break;

    case 'firstLetter':
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        await fetchMealsByFirstLetter(search);
      }
      break;
    default: return null;
    }
  };

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleRadio = ({ target: { value } }) => {
    setradioValue(value);
  };

  // console.log(path);
  return (

    <div>

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
        onClick={ handleFetchSearch }
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
