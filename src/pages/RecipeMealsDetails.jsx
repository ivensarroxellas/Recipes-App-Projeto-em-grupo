import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Auxílio Luiz Filipe
function RecipeMealsDetails() {
  const { id } = useParams();
  const [RecipeMeals, setRecipeMeals] = useState({});

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
      const { meals } = await response.json();
      setRecipeMeals(meals[0]);
    };
    fetchMeal();
  }, [id]);

  const rendIngredients = () => {
    const ingredients = [];
    const maxIngredients = 20;
    for (let index = 0; index <= maxIngredients; index += 1) {
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
    </>
  );
}

export default RecipeMealsDetails;
