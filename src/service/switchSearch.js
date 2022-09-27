// import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByFirstLetter,
  fetchDrinksByName } from './fetch';

const useSearch = (search, path, radioValue) => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const handleFetchSearch = async () => {
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
      default: return undefined;
      }
    };
    handleFetchSearch();
  }, [search, radioValue, path]);

  return { meals, drinks };
};

export default useSearch;
