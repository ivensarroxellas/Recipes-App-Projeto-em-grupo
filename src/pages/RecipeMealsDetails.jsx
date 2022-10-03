import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CarouselDrinks from '../components/CarouselDrinks';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

// Auxílio Luiz Filipe
function RecipeMealsDetails({ match }) {
  const [recipeMeals, setRecipeMeals] = useState({});
  const [shareCopyRender, setShareCopyRender] = useState(false);
  const [getRecipeStorage, setGetRecipeStorage] = useState([]);
  const [favIcon, setFavIcon] = useState(false);

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
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocalStorage) {
      setGetRecipeStorage(getLocalStorage);
    }
  }, []);

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeMeals(data.meals[0]);
    };
    fetchMeal();
  }, [id]);

  const iconFavorite = () => {
    const checkFavorite = getRecipeStorage.some((recipe) => recipe.id === id);
    if (checkFavorite) {
      setFavIcon(true);
    } else {
      setFavIcon(false);
    }
  };

  useEffect(() => {
    iconFavorite();
  });

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
      if (recipeMeals[ingredient] && recipeMeals[measure] !== null) {
        ingredients.push(`${recipeMeals[ingredient]} (${recipeMeals[measure]}) `);
      }
    }
    return ingredients;
  };

  const recipeFormat = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipeMeals;
    return {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
  };

  const checkingRecipeRepeated = (recipeStorage, recipeFormatt) => (
    recipeStorage.some((recipe) => (
      recipe.id === recipeFormatt.id
    ))
  );

  const checkingFavoriteRecipe = (recipeLocalStorage) => {
    const recipeMealFormatted = recipeFormat();
    if (recipeLocalStorage === null) {
      return [{ ...recipeMealFormatted }];
    }
    if (!checkingRecipeRepeated(recipeLocalStorage, recipeMealFormatted)) {
      return [...recipeLocalStorage, recipeMealFormatted];
    }
    console.log(`Receita ${recipeMeals.strMeal} já foi salva`);
    return recipeLocalStorage.filter((recipe) => recipe.id !== recipeMealFormatted.id);
  };

  const handleFavorite = () => {
    const newFavoriteRecipes = checkingFavoriteRecipe(getRecipeStorage);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setGetRecipeStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipeMeals.strMealThumb }
        alt={ recipeMeals.strMeal }
      />
      <h1 data-testid="recipe-title">{recipeMeals.strMeal}</h1>
      <h3 data-testid="recipe-category">{recipeMeals.strCategory}</h3>
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
        onClick={ handleFavorite }
      >
        { favIcon
          ? <img data-testid="favorite-btn" src={ blackHeartIcon } alt="favorite" />
          : <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="not favorite" />}
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
      <p data-testid="instructions">{recipeMeals.strInstructions}</p>
      { embedURL(recipeMeals.strYoutube)
        && <iframe
          src={ embedURL(recipeMeals.strYoutube) }
          title={ recipeMeals.strMeal }
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
          {NameButton}
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
