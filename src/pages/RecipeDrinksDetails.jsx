import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Auxílio Luiz Filipe
function RecipeDrinksDetails() {
  const { id } = useParams();
  const [drinkDetails, setDrinkDetails] = useState({});

  useEffect(() => {
    const fetchDrink = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDrinkDetails(data.drinks[0]);
    };
    fetchDrink();
  }, [id]);

  const rendIngredients = () => {
    const ingredients = [];
    const maxIngredients = 15;
    for (let index = 0; index <= maxIngredients; index += 1) {
      const ingredient = `strIngredient${index}`;
      const measure = `strMeasure${index}`;
      if (drinkDetails[ingredient] && drinkDetails[measure] !== null) {
        ingredients.push(`${drinkDetails[ingredient]} (${drinkDetails[measure]}) `);
      }
    }
    return ingredients;
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
      />
      <h1 data-testid="recipe-title">{drinkDetails.strDrink}</h1>
      <h3 data-testid="recipe-category">{drinkDetails.strAlcoholic}</h3>
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
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
    </>
  );
}
export default RecipeDrinksDetails;
