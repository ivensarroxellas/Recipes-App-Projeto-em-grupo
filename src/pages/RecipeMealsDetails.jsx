import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CarouselDrinks from '../components/CarouselDrinks';

// Auxílio Luiz Filipe
function RecipeMealsDetails({ match }) {
  const [RecipeMeals, setRecipeMeals] = useState({});
  const [shareCopyRender, setShareCopyRender] = useState(false);
  const { params: { id } } = match;
  let renderButton = '';
  const history = useHistory();

  const embedURL = (url) => {
    if (url) {
      const URL = url;
      const newURL = URL.replace('watch?v=', 'embed/');
      return newURL;
    }
  };
  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeMeals(data.meals[0]);
    };
    fetchMeal();
  }, [id]);

  function handleClickShareBtn() {
    setShareCopyRender(true);
    copy(`http://localhost:3000${window.location.pathname}`);
  }

  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const NameBtn = !recipesInProgress ? 'Start Recipe' : 'Continue Recipe';

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
      if (RecipeMeals[ingredient] && RecipeMeals[measure] !== null) {
        ingredients.push(`${RecipeMeals[ingredient]} (${RecipeMeals[measure]}) `);
      }
    }
    return ingredients;
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ RecipeMeals.strMealThumb }
        alt={ RecipeMeals.strMeal }
      />
      <h1 data-testid="recipe-title">{RecipeMeals.strMeal}</h1>
      <h3 data-testid="recipe-category">{RecipeMeals.strCategory}</h3>
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
      <p data-testid="instructions">{RecipeMeals.strInstructions}</p>
      { embedURL(RecipeMeals.strYoutube)
        && <iframe
          src={ embedURL(RecipeMeals.strYoutube) }
          title={ RecipeMeals.strMeal }
          allowFullScreen
          data-testid="video"
        />}

      <div>
        <CarouselDrinks />
      </div>
      {renderButton === '' && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          name="startRecipe"
          className="fixed-bottom position-fixed"
          onClick={ () => history.push(`/meals/${id}/in-progress`) }
        >
          {NameBtn}
        </button>)}
    </>
  );
}

RecipeMealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeMealsDetails;
