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
  fetchDrinkDetails,
} from '../service/fetch';
import routValidator from '../service/routValidator';

const NUMBER_TO_SLICE = 12;
const SLICER5 = 5;

const slicer = (arr) => arr.slice(0, NUMBER_TO_SLICE);

const slicer5 = (arr) => arr.slice(0, SLICER5);

function RecipesProvider({ children }) {
  const [filtredMeals, setFiltredMeals] = useState([]);
  const [initialMeals, setInitialMeals] = useState([]);

  const [filtredDrinks, setFiltredDrinks] = useState([]);
  const [initialDrinks, setInitialDrinks] = useState([]);

  const [filterButtons, setFilterButtons] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState({});

  const [radioValue, setRadioValue] = useState('');
  const [path, setPath] = useState('');

  const [isRecipeDone, setIsRecipeDone] = useState(true);

  const history = useHistory();

  useEffect(() => {
    routValidator(path, filtredMeals, filtredDrinks, history);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredMeals, filtredDrinks]);

  // console.log(initialMeals);

  useEffect(() => {
    const setInitialState = async () => {
      setInitialMeals(slicer(await fetchInitialMeals()));
      setInitialDrinks(slicer(await fetchInitialDrinks()));
    };
    setInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchSearch = async (search) => {
    switch (radioValue) {
    case 'ingredient':
      if (path === '/meals') {
        setFiltredMeals(slicer(await fetchMealsByIngredient(search)));
      } else if (path === '/drinks') {
        setFiltredDrinks(slicer(await fetchDrinksByIngredient(search)));
      }
      break;

    case 'name':
      if (path === '/meals') {
        setFiltredMeals(slicer(await fetchMealsByName(search)));
      } else if (path === '/drinks') {
        setFiltredDrinks(slicer(await fetchDrinksByName(search)));
      }
      break;

    case 'firstLetter':
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } if (path === '/meals') {
        setFiltredMeals(slicer(await fetchMealsByFirstLetter(search)));
      } if (path === '/drinks') {
        setFiltredDrinks(slicer(await fetchDrinksByFirstLetter(search)));
      }
      break;
    default: return null;
    }
  };

  const handleFetchDetails = async (id) => {
    setDrinkDetails(await fetchDrinkDetails(id));
  };

  const HandleButtonFetchMeals = async () => {
    setFilterButtons(slicer5(await fetchButtonMeals()));
  };

  const HandleButtonFetchDrinks = async () => {
    setFilterButtons(slicer5(await fetchButtonDrinks()));
  };

  const handleButtonFetch = () => {
    if (path === '/meals') {
      HandleButtonFetchMeals();
    } else if (path === '/drinks') {
      HandleButtonFetchDrinks();
    }
  };

  const contextValue = {
    filtredMeals,
    filtredDrinks,
    path,
    radioValue,
    initialMeals,
    initialDrinks,
    isRecipeDone,
    setRadioValue,
    handleFetchSearch,
    setPath,
    setFiltredDrinks,
    HandleButtonFetchMeals,
    HandleButtonFetchDrinks,
    handleButtonFetch,
    handleFetchDetails,
    drinkDetails,
    filterButtons,
    setIsRecipeDone,
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
