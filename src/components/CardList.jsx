import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { showDrinkCard, showMealCard } from '../service/index';

import '../styles/components/CardList.css';

function CardList() {
  const { filtredMeals, filtredDrinks,
    initialMeals, initialDrinks, path } = useContext(RecipesContext);

  // console.log(handleSliceArr(filtredMeals));

  console.log(filtredMeals);
  const mealsVerificator = !filtredMeals.length
    ? showMealCard(initialMeals)
    : showMealCard(filtredMeals);

  const drinksVerificator = !filtredDrinks.length
    ? showDrinkCard(initialDrinks)
    : showDrinkCard(filtredDrinks);

  const handleShowRecipes = () => {
    if (path === '/meals') {
      return mealsVerificator;
    } if (path === '/drinks') {
      return drinksVerificator;
    }
  };

  return (

    <div>
      { handleShowRecipes() }
    </div>

  );
}

export default CardList;
