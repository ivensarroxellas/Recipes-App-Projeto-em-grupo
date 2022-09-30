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
  // fetchButtonMeals,
  // fetchButtonDrinks,
  fetchMealsCategory,
  fetchDrinksCategory,
} from '../service/fetch';

// import slicer, { slice5 } from '../service/slicer';

function RecipesProvider({ children }) {
  const [filtredMeals, setFiltredMeals] = useState([]);
  const [filtredDrinks, setFiltredDrinks] = useState([]);
  // -- barra de busca

  const [initialMeals, setInitialMeals] = useState([]);
  const [initialDrinks, setInitialDrinks] = useState([]);
  // -- os 12 primeiros

  const [categoryFilter, setCategoryFilter] = useState([]);
  // -- valor do botão de category--

  const [filtredCategoryMeals, setFiltredCategoryMeals] = useState([]);
  const [filtredCategoryDrinks, setFiltredCategoryDrinks] = useState([]);
  // -- valor filtrado pelo botão

  const [radioValue, setRadioValue] = useState('');
  // - radio da barra de pesquisa --

  const history = useHistory();
  const { location: { pathname } } = history;

  console.log(filtredCategoryDrinks);

  useEffect(() => {
    const setInitialState = async () => {
      setInitialMeals(await fetchInitialMeals());
      setInitialDrinks(await fetchInitialDrinks());
    };
    setInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        setFiltredMeals(await fetchMealsByName(search));
      } else if (pathname === '/drinks') {
        setFiltredDrinks(await fetchDrinksByName(search));
      }
      break;

    case 'firstLetter':
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } if (pathname === '/meals') {
        setFiltredMeals(await fetchMealsByFirstLetter(search));
      } if (pathname === '/drinks') {
        setFiltredDrinks(await fetchDrinksByFirstLetter(search));
      }
      break;
    default: return null;
    }
  };

  const handleFetchCategory = async () => {
    const categoryMeals = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
    const categoryDrinks = ['Ordinary Drink', 'Cocktail',
      'Shake', 'Other/Unknown', 'Cocoa'];
    const categoryVerificator = (arr, word) => arr.some((category) => category === word);

    if (categoryVerificator(categoryMeals, categoryFilter)) {
      return setFiltredCategoryMeals(await fetchMealsCategory(categoryFilter));
    } if (categoryVerificator(categoryDrinks, categoryFilter)) {
      return setFiltredCategoryDrinks(await fetchDrinksCategory(categoryFilter));
    }
  };

  useEffect(() => {
    handleFetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

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
    setCategoryFilter,
    filtredCategoryMeals,
    filtredCategoryDrinks,
    pathname,
    setFiltredCategoryMeals,
    setFiltredCategoryDrinks,
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
