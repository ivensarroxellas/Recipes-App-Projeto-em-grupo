import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CarouselMeals from '../components/CarouselMeals';

// Auxílio Luiz Filipe
function RecipeDrinksDetails({ match }) {
  const [recipeDrinks, setRecipeDrinks] = useState({});
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
      if (recipeDrinks[ingredient] && recipeDrinks[measure] !== null) {
        ingredients.push(`${recipeDrinks[ingredient]} (${recipeDrinks[measure]}) `);
      }
    }
    return ingredients;
  };

  const recipeFormat = () => {
    const { idDrink, strCategory, strDrink, strDrinkThumb,
    } = recipeDrinks;
    return {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: 'Alcoholic',
      name: strDrink,
      image: strDrinkThumb,
    };
  };

  const checkingRecipeRepeated = (recipeStorage, recipeFormatt) => (
    recipeStorage.some((recipe) => (
      recipe.id === recipeFormatt.id
    ))
  );

  const checkingFavoriteRecipe = (recipeLocalStorage) => {
    const recipeDrinkFormatted = recipeFormat();
    if (recipeLocalStorage === null) {
      return [{ ...recipeDrinkFormatted }];
    }
    // Testa se a receita já esta salva
    if (!checkingRecipeRepeated(recipeLocalStorage, recipeDrinkFormatted)) {
      return [...recipeLocalStorage, recipeDrinkFormatted];
    }
    console.log(`Receita ${recipeDrinks.strDrink} já foi salva`);
    return recipeLocalStorage;
  };

  const handleFavorite = () => {
    console.log(recipeDrinks);
    // Traz o que está salvo no localStorage
    const getRecipeStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // Salva em um array o spred do localStorage (se tiver) e a receita atual
    const newFavoriteRecipes = checkingFavoriteRecipe(getRecipeStorage);
    // Retorna o array para o localStorage
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipeDrinks.strDrinkThumb }
        alt={ recipeDrinks.strDrink }
      />
      <h1 data-testid="recipe-title">{recipeDrinks.strDrink}</h1>
      <h3 data-testid="recipe-category">{recipeDrinks.strAlcoholic}</h3>
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
        onClick={ handleFavorite }
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
      <p data-testid="instructions">{recipeDrinks.strInstructions}</p>

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
