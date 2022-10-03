import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DrinkRecipeInProgress() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [renderPermission, setrenderPermission] = useState(false);
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

  const redirectToFinishDoneRecipe = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      {console.log(drinkDetails.drinks)}
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
            <button data-testid="share-btn" type="button">Share</button>
            <button data-testid="favorite-btn" type="button">Favorite</button>
            <p data-testid="recipe-category">{ elem.strCategory }</p>
            <p data-testid="instructions">{ elem.strInstructions }</p>
            {/* Tentar renderizar ingredients e measures */}
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
