import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useParams } from 'react-router-dom';

function DrinkRecipeInProgress() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [renderPermission, setrenderPermission] = useState(false);
  const [shareCopyRender, setShareCopyRender] = useState(false);
  const { id } = useParams();

  const history = useHistory();

  const fetchDrinksDetails = async (idDrink) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
    const results = await response.json();
    setDrinkDetails(results);
    setrenderPermission(true);
  };

  useEffect(() => {
    if (window.location.pathname.includes('/drinks')) {
      fetchDrinksDetails(id);
    }
    // eslint-disable-next-line
  }, []);

  const handleCopy = () => {
    setShareCopyRender(true);
    const inProgress = window.location.pathname.indexOf('/in-progress');
    copy(`http://localhost:3000${window.location.pathname.slice(0, inProgress)}`);
  };

  const rendIngredients = () => {
    const ingredients = [];
    const NUMBER_QUINZE = 15;
    for (let index = 1; index <= NUMBER_QUINZE; index += 1) {
      const ingredient = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      console.log('drinkDetails: ', drinkDetails.drinks[0]);
      if (drinkDetails.drinks[0][ingredient] !== null
        && drinkDetails.drinks[0][measure] !== '') {
        let ingredientDrink = `${drinkDetails.drinks[0][ingredient]}`;
        if (drinkDetails.drinks[0][measure]) {
          ingredientDrink += ` (${drinkDetails.drinks[0][measure]})`;
        }
        ingredients.push(ingredientDrink);
      }
    }
    // console.log('ingredients: ', ingredients);
    return ingredients;
  };

  const redirectToFinishDoneRecipe = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      {renderPermission && (
        drinkDetails.drinks.map((elem, index) => (
          <div key={ index }>
            <img
              alt="meal-thumbnail"
              src={ elem.strDrinkThumb }
              width="200"
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-title">{ elem.strDrink }</p>
            {shareCopyRender && <h4>Link copied!</h4>}
            <button
              data-testid="share-btn"
              type="button"
              onClick={ handleCopy }
            >
              Share
            </button>
            <button data-testid="favorite-btn" type="button">Favorite</button>
            <p data-testid="recipe-category">{ elem.strCategory }</p>
            <p data-testid="instructions">{ elem.strInstructions }</p>
            <h6>Ingredients:</h6>
            { rendIngredients().map((item, i) => (
              <li key={ i }>
                <label
                  htmlFor="ingredient"
                  data-testid={ `${i}-ingredient-step` }
                >
                  <input type="checkbox" name="ingredient" id="ingredient" />
                  {' '}
                  {item}
                </label>
              </li>
            ))}
          </div>
        )))}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ redirectToFinishDoneRecipe }
      >
        Finish Recipe

      </button>
    </div>
  );
}

export default DrinkRecipeInProgress;
