import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByFirstLetter,
  fetchDrinksByName,
  fetchInitialMeals,
  fetchInitialDrinks,
} from '../service/fetch';
import routValidator from '../service/routValidator';

function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [radioValue, setRadioValue] = useState('');
  const [path, setPath] = useState('');
  const history = useHistory();

  useEffect(() => {
    routValidator(path, meals, drinks, history);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meals, drinks]);

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
  const HandleInitialFetchMeals = async () => {
    setLoading(true);
    setMeals(await fetchInitialMeals());
    setLoading(false);
  };

  const HandleInitialFetchDrinks = async () => {
    setLoading(true);
    setDrinks(await fetchInitialDrinks());
    setLoading(false);
  };

  const handleInitialFetch = () => {
    if (path === '/meals') {
      HandleInitialFetchMeals();
    } else if (path === '/drinks') {
      HandleInitialFetchDrinks();
    }
  };

  const contextValue = {
    meals,
    drinks,
    path,
    radioValue,
    loading,
    setRadioValue,
    handleFetchSearch,
    handleInitialFetch,
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
