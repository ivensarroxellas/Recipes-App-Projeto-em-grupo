import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinkRecipeById, fetchMealRecipeById } from '../service/fetch';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails({ match }) {
  const { setMealDetails, setDrinkDetails,
      drinkDetails, mealDetails } = useContext(RecipesContext);

  useEffect(() => {
    const getData = async () => {
      if (match.path === '/drinks/:id') {
        setDrinkDetails(await fetchDrinkRecipeById(match.params.id));
      } else if (match.path === '/meals/:id') {
        setMealDetails(await fetchMealRecipeById(match.params.id));
      }
    };
    getData();
  }, []);

  if (match.path === '/drinks/:id') {
    return (
      <div>
        <h1>Bebida</h1>
        {/* <img src={`${drinkDetails}`} data-testid="recipe-photo" /> */}
        <h1 data-testid="recipe-title">{drinkDetails.strDrink}</h1>
        <h3 data-testid="recipe-category">Categoria</h3>
        <ul>
          <li
            data-testid="${index}-ingredient-name-and-measure"
          >
            Ingredientes e medidas

          </li>
        </ul>
        <p data-testid="instructions">Instrções</p>
      </div>
    );
  } if (match.path === '/meals/:id') {
    return (
      <div>
        <h1>Comida</h1>
        <img data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">Nome da receita</h1>
        <h3 data-testid="recipe-category">Categoria</h3>
        <ul>
          <li
            data-testid="${index}-ingredient-name-and-measure"
          >
            Ingredientes e medidas

          </li>
        </ul>
        <p data-testid="instructions">Instrções</p>
        <p>Vídeo</p>
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
