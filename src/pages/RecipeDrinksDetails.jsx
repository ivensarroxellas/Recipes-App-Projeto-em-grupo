import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CarouselMeals from '../components/CarouselMeals';

// Auxílio Luiz Filipe
function RecipeDrinksDetails({ match }) {
  const [RecipeDrinks, setRecipeDrinks] = useState({});
  const [shareCopyRender, setShareCopyRender] = useState(false);
  const { params: { id } } = match;
  let renderButton = '';
  const history = useHistory();

  useEffect(() => {
    const fetchDrink = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeDrinks(data.drinks[0]);
    };
    fetchDrink();
  }, [id]);

  function handleClickShareBtn() {
    setShareCopyRender(true);
    copy(`http://localhost:3000${window.location.pathname}`);
  }

  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const NameButton = !recipesInProgress ? 'Start Recipe' : 'Continue Recipe';

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
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleClickShareBtn }
      >
        Compartilhar Receita
      </button>
      {shareCopyRender && <h4>Link copied!</h4>}
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar Receita
      </button>
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
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          {NameButton}
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
