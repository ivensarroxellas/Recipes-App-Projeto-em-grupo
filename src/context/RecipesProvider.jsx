import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByFirstLetter,
  fetchDrinksByName,
} from '../service/fetch';

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [radioValue, setRadioValue] = useState('');
  const [path, setPath] = useState('');

  console.log(drinks);
  console.log(meals);

  const handleFetchSearch = async (search) => {
    switch (radioValue) {
    case 'ingredient':
      if (path === '/meals') {
        setMeals(await fetchMealsByIngredient(search));
      } else if (path === '/drinks') {
        setDrinks(await fetchDrinksByIngredient(search));
      }
      break;

    case 'name':
      if (path === '/meals') {
        setMeals(await fetchMealsByName(search));
      } else if (path === '/drinks') {
        setDrinks(await fetchDrinksByName(search));
      }
      break;

    case 'firstLetter':
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (path === '/meals') {
        setMeals(await fetchMealsByFirstLetter(search));
      } else if (path === '/drinks') {
        setDrinks(await fetchDrinksByFirstLetter(search));
      }
      break;
    default: return null;
    }
  };

  const contextValue = {
    meals,
    radioValue,
    setRadioValue,
    handleFetchSearch,
    setPath,
  };
  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
