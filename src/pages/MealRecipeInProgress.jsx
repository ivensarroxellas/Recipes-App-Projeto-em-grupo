import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useParams } from 'react-router-dom';

function MealRecipeInProgress() {
  const [mealDetails, setMealDetails] = useState({});
  const [renderPermission, setrenderPermission] = useState(false);
  const [shareCopyRender, setShareCopyRender] = useState(false);
  const { id } = useParams();

  const history = useHistory();

  const fetchMealsDetails = async (idMeal) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const results = await response.json();
    setMealDetails(results);
    setrenderPermission(true);
  };

  useEffect(() => {
    if (window.location.pathname.includes('/meals')) {
      fetchMealsDetails(id);
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
    for (let index = 0; index <= NUMBER_QUINZE; index += 1) {
      const ingredient = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      if (mealDetails.meals[0][ingredient] && mealDetails.meals[0][measure] !== null) {
        ingredients.push(`${mealDetails.meals[0][ingredient]} 
        ${mealDetails.meals[0][measure]}) `);
      }
    }
    return ingredients;
  };

  const redirectToFinishDoneRecipe = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      {renderPermission && (
        mealDetails.meals.map((elem, index) => (
          <div key={ index }>
            <img
              alt="meal-thumbnail"
              src={ elem.strMealThumb }
              width="200"
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-title">{ elem.strMeal }</p>
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

export default MealRecipeInProgress;
