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
<<<<<<< HEAD
    const NUMBER_QUINZE = 15;
=======
    const NUMBER_QUINZE = 20;
>>>>>>> c88ab41951f31976231f6a87634387e453c0db88
    for (let index = 0; index <= NUMBER_QUINZE; index += 1) {
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
<<<<<<< HEAD
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
    </>
  );
}
RecipeDrinksDetails.propTypes = {
=======
      <p data-testid="instructions">{RecipeMeals.strInstructions}</p>
      { embedURL(RecipeMeals.strYoutube)
        && <iframe
          src={ embedURL(RecipeMeals.strYoutube) }
          title={ RecipeMeals.strMeal }
          allowFullScreen
          data-testid="video"
        />}
      <button
        data-testid="start-recipe-btn"
        type="button"
        name="startRecipe"
        className="fixed-bottom"
      >
        Start Recipe
      </button>
    </>
  );
}

RecipeMealsDetails.propTypes = {
>>>>>>> c88ab41951f31976231f6a87634387e453c0db88
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
<<<<<<< HEAD
export default RecipeDrinksDetails;
=======

export default RecipeMealsDetails;
>>>>>>> c88ab41951f31976231f6a87634387e453c0db88
