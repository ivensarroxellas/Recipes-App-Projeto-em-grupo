import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { showDrinkCard, showMealCard } from '../service/index';
import '../styles/components/CardList.css';
import FilterButton from './FilterButton';

function CardList() {
  const { filtredMeals, filtredDrinks,
    initialMeals,
    initialDrinks,
    filtredCategoryMeals,
    filtredCategoryDrinks,
    categoryFilter,
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

  const conditionalShowRecipes = () => {
    const categoryMeals = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
    const categoryDrinks = ['Ordinary', 'Cocktail', 'Shake', 'Other/Unknow', 'Cocoa'];

    const categoryVerificator = (arr, word) => arr.some((category) => category === word);

    console.log(categoryFilter);

    if (categoryVerificator(categoryMeals, categoryFilter)) {
      return handleShowCategoryMeals();
    } if (categoryVerificator(categoryDrinks, categoryFilter)) {
      return handleShowCategoryDrinks();
    } return handleShowInitialRecipes();
  };

  return (

    <div>
      <section>
        <FilterButton />
      </section>
      { conditionalShowRecipes() }
    </div>

  );
}

export default CardList;
