import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function MealRecipeInProgress() {
  const [mealDetails, setMealDetails] = useState({});
  const [renderPermission, setrenderPermission] = useState(false);
  const { id } = useParams();

  const history = useHistory();
  const { location: { pathname } } = history;

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
            <button data-testid="share-btn" type="button">Share</button>
            <button data-testid="favorite-btn" type="button">Favorite</button>
            <p data-testid="recipe-category">{ elem.strCategory }</p>
            <p data-testid="instructions">{ elem.strInstructions }</p>
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
