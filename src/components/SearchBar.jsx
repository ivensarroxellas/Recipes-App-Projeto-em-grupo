import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        placeholder="Faça sua busca"
        type="text"
        data-testid="search-input"
      />
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
      <input
        type="radio"
        name="filter"
        data-testid="ingredient-search-radio"
      />
      Ingrediente
      <input
        type="radio"
        name="filter"
        data-testid="name-search-radio"
      />
      Nome
      <input
        type="radio"
        name="filter"
        data-testid="first-letter-search-radio"
      />
      Primeira letra
    </div>
  );
}

export default SearchBar;
