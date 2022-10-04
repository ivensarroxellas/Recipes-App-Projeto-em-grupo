import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';

function DoneRecipes() {
  const [showRecipe, setShowRecipe] = useState([]);

  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  useEffect(() => {
    setShowRecipe(doneRecipes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterMeals = () => {
    const filterRecipe = doneRecipes.filter(({ type }) => type === 'meal');
    setShowRecipe(filterRecipe);
  };

  const handleFilterDrinks = () => {
    const filterRecipe = doneRecipes.filter(({ type }) => type === 'drink');
    setShowRecipe(filterRecipe);
  };

  const handleFilterAll = () => {
    setShowRecipe(doneRecipes);
  };

  console.log(showRecipe);
  return (
    <div>
      <h1 data-testid="page-title">Done Recipes</h1>
      <Link to="/profile">
        <img src={ imageProfile } alt="imagem de perfil" data-testid="profile-top-btn" />
      </Link>
      <section>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleFilterAll }
        >
          All
        </button>

        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleFilterMeals }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleFilterDrinks }
        >
          Drinks
        </button>

        {
          showRecipe.map(({ image, name, category, tags }, index) => (
            <section key={ index }>
              <img
                src={ image }
                data-testid={ `${index}-horizontal-image` }
                alt={ name }
              />

              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                { category }
              </h3>

              <h4
                data-testid={ `${index}-horizontal-name` }
              >
                { name }
              </h4>

              <h5
                data-testid={ `${index}-horizontal-done-date` }
              >
                {new Date().toLocaleDateString()}
              </h5>

              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
              >
                Share
              </button>
              {
                tags.map((tag, i) => (
                  <spam
                    key={ i }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </spam>
                ))
              }

            </section>

          ))
        }

      </section>
    </div>
  );
}

export default DoneRecipes;
