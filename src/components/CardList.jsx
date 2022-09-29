import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import { showDrinkCard, showMealCard } from '../service/index';
import '../styles/components/CardList.css';

function CardList() {
  const { filtredMeals, filtredDrinks,
    initialMeals,
    initialDrinks,
    pathname,
    filtredCategoryMeals,
    filtredCategoryDrinks,
    categoryFilter,
  } = useContext(RecipesContext);

  // useEffect(() => {
  //   getCurrentURL();
  // }, []);

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

  console.log(initialMeals);

  const conditionalShowRecipes = () => {
    const categoryMeals = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
    const categoryDrinks = ['Ordinary', 'Cocktail', 'Shake', 'Other/Unknow', 'Cocoa'];
    const categoryVerificator = (arr, word) => arr.some((category) => category === word);

    if (categoryVerificator(categoryMeals, categoryFilter)) {
      return handleShowCategoryMeals();
    } if (categoryVerificator(categoryDrinks, categoryFilter)) {
      return handleShowCategoryDrinks();
    } return handleShowInitialRecipes();
  };

  useEffect(() => {
    handleShowInitialRecipes();
  }, [initialMeals, initialDrinks]);

  return (

    <div>
      { conditionalShowRecipes()}
    </div>

  );
}

export default CardList;
