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
  fetchButtonMeals,
  fetchButtonDrinks,
  fetchMealsCategory,
  fetchDrinksCategory,
} from '../service/fetch';

import routValidator from '../service/routValidator';
import slicer from '../service/slicer';

const SLICER5 = 5;
const slicer5 = (arr) => arr.slice(0, SLICER5);

function RecipesProvider({ children }) {
  const [filtredMeals, setFiltredMeals] = useState([]);
  const [initialMeals, setInitialMeals] = useState([]);

  const [filtredDrinks, setFiltredDrinks] = useState([]);
  const [initialDrinks, setInitialDrinks] = useState([]);

  const [filterButtons, setFilterButtons] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const [filtredCategoryMeals, setFiltredCategoryMeals] = useState([]);
  const [filtredCategoryDrinks, setFiltredCategoryDrinks] = useState([]);

  const [radioValue, setRadioValue] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    routValidator(pathname, filtredMeals, filtredDrinks);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredMeals, filtredDrinks]);

  useEffect(() => {
    const setInitialState = async () => {
      setInitialMeals(slicer(await fetchInitialMeals()));
      setInitialDrinks(slicer(await fetchInitialDrinks()));
    };
    setInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMeals, initialDrinks]);

  const handleFetchSearch = async (search) => {
    switch (radioValue) {
    case 'ingredient':
      if (pathname === '/meals') {
        setFiltredMeals(await fetchMealsByIngredient(search));
      } else if (pathname === '/drinks') {
        setFiltredDrinks(await fetchDrinksByIngredient(search));
      }
      break;

    case 'name':
      if (pathname === '/meals') {
        setFiltredMeals(slicer(await fetchMealsByName(search)));
      } else if (pathname === '/drinks') {
        setFiltredDrinks(slicer(await fetchDrinksByName(search)));
      }
      break;

    case 'firstLetter':
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } if (pathname === '/meals') {
        setFiltredMeals(slicer(await fetchMealsByFirstLetter(search)));
      } if (pathname === '/drinks') {
        setFiltredDrinks(slicer(await fetchDrinksByFirstLetter(search)));
      }
      break;
    default: return null;
    }
  };

  const HandleButtonFetchMeals = async () => {
    setFilterButtons(slicer5(await fetchButtonMeals()));
  };

  const HandleButtonFetchDrinks = async () => {
    setFilterButtons(slicer5(await fetchButtonDrinks()));
  };

  const handleButtonFetch = () => {
    if (pathname === '/meals') {
      HandleButtonFetchMeals();
    } else if (pathname === '/drinks') {
      HandleButtonFetchDrinks();
    }
  };
  const handleCategoryMeals = async () => {
    setFiltredCategoryMeals(await fetchMealsCategory(categoryFilter));
  };

  const handleCategoryDrinks = async () => {
    setFiltredCategoryDrinks(await fetchDrinksCategory(categoryFilter));
  };

  useEffect(() => {
    handleCategoryMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  useEffect(() => {
    handleCategoryDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  // console.log(categoryFilter);
  const contextValue = {
    categoryFilter,
    filtredMeals,
    filtredDrinks,
    radioValue,
    initialMeals,
    initialDrinks,
    setRadioValue,
    handleFetchSearch,
    setFiltredDrinks,
    HandleButtonFetchMeals,
    HandleButtonFetchDrinks,
    handleButtonFetch,
    filterButtons,
    setCategoryFilter,
    filtredCategoryMeals,
    filtredCategoryDrinks,
    pathname,

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
