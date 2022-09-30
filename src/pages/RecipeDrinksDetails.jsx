import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CarouselMeals from '../components/CarouselMeals';

// Auxílio Luiz Filipe
function RecipeDrinksDetails({ match }) {
  const [RecipeDrinks, setRecipeDrinks] = useState({});
  const { params: { id } } = match;
  let renderButton = '';
  let renderContinue = '';

  useEffect(() => {
    const fetchDrink = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeDrinks(data.drinks[0]);
    };
    fetchDrink();
  }, [id]);

  const recipesProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (recipesProgress !== null) {
    const { drinks } = inProgressRecipes;
    renderContinue = Object.keys(drinks).some((recipe) => recipe === id);
  }
  const NameBtn = !renderContinue ? 'Start Recipe' : 'Continue Recipe';

  const doneRecipesOnLocal = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipesOnLocal !== null) {
    renderButton = doneRecipesOnLocal.some((recipe) => recipe.id !== id);
  }

  const rendIngredients = () => {
    const ingredients = [];
    const NUMBER_QUINZE = 15;
    for (let index = 0; index <= NUMBER_QUINZE; index += 1) {
      const ingredient = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      if (RecipeDrinks[ingredient] && RecipeDrinks[measure] !== null) {
        ingredients.push(`${RecipeDrinks[ingredient]} (${RecipeDrinks[measure]}) `);
      }
    }
    return ingredients;
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ RecipeDrinks.strDrinkThumb }
        alt={ RecipeDrinks.strDrink }
      />
      <h1 data-testid="recipe-title">{RecipeDrinks.strDrink}</h1>
      <h3 data-testid="recipe-category">{RecipeDrinks.strAlcoholic}</h3>
      <ul>
        <h6>Ingredients:</h6>
        { rendIngredients().map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {item}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{RecipeDrinks.strInstructions}</p>

      <div>
        <CarouselMeals />
      </div>
      {renderButton === '' && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          name="startRecipe"
          className="fixed-bottom"
        >
          {NameBtn}
        </button>)}
    </>
  );
}

RecipeDrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeDrinksDetails;
