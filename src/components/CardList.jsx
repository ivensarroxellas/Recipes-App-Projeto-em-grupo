import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { showDrinkCard, showMealCard } from '../service/index';
import '../styles/components/CardList.css';

function CardList() {
  const { filtredMeals, filtredDrinks,
    initialMeals,
    initialDrinks,
    filtredCategoryMeals,
    filtredCategoryDrinks,
    categoryFilter,
    setFiltredCategoryMeals,
  } = useContext(RecipesContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const mealsVerificator = !filtredMeals.length
    ? showMealCard(initialMeals)
    : showMealCard(filtredMeals);

  const drinksVerificator = !filtredDrinks.length
    ? showDrinkCard(initialDrinks)
    : showDrinkCard(filtredDrinks);

  const handleShowInitialRecipes = () => {
    if (pathname === '/meals') {
      return mealsVerificator;
    } if (pathname === '/drinks') {
      return drinksVerificator;
    }
  };
  const handleShowCategoryMeals = () => {
    if (filtredCategoryMeals) {
      return showMealCard(filtredCategoryMeals);
    } return handleShowInitialRecipes();
  };

  const handleShowCategoryDrinks = () => {
    if (filtredCategoryDrinks) {
      return showDrinkCard(filtredCategoryDrinks);
    } return handleShowInitialRecipes();
  };

  const showIfEmpty = () => {
    if (filtredCategoryMeals.length === 0) {
      return setFiltredCategoryMeals(initialMeals);
    }
  };
  console.log(filtredCategoryMeals);
  const conditionalShowRecipes = () => {
    const categoryMeals = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
    const categoryDrinks = ['Ordinary', 'Cocktail', 'Shake', 'Other/Unknow', 'Cocoa'];
    const categoryVerificator = (arr, word) => arr.some((category) => category === word);

    if (filtredMeals.length === 1 && pathname === '/meals') {
      history.push(`/meals/${filtredMeals[0].idMeal}`);
    } if (filtredDrinks.length === 1 && pathname === '/drinks') {
      history.push(`/drinks/${filtredDrinks[0].idDrink}`);
    } if (filtredCategoryMeals.length === 1 && pathname === '/meals') {
      history.push(`/meals/${filtredCategoryMeals[0].idMeal}`);
    } if (filtredCategoryDrinks.length === 1 && pathname === '/drinks') {
      history.push(`/meals/${filtredCategoryDrinks[0].idDrink}`);
    }

    if (categoryVerificator(categoryMeals, categoryFilter)) {
      return handleShowCategoryMeals();
    } if (categoryVerificator(categoryDrinks, categoryFilter)) {
      return handleShowCategoryDrinks();
    } return handleShowInitialRecipes();
  };

  return (

    <div>
      <section />
      { !showIfEmpty() && conditionalShowRecipes() }
    </div>

  );
}

export default CardList;
