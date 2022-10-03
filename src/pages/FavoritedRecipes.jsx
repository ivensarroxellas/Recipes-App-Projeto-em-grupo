import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

// mock teste apagar ao final
const mockRecipe = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  }];

function FavoritedRecipes() {
  const [shareCopyRender, setShareCopyRender] = useState(false);

  const changeImageFavorite = () => {
    // const recipesFavorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const NameButton = !recipesFavorited ? 'Start Recipe' : 'Continue Recipe';
  };

  function handleClickShareBtn(type, id) {
    if (type === 'meal') {
      console.log(type);
      copy(`http://localhost:3000/meals/${id}`);
    }
    setShareCopyRender(true);
  }

  return (
    <>
      <header>
        <Link to="/profile">
          <img
            src={ imageProfile }
            alt="imagem de perfil"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">Favorite Recipes</h1>
      </header>
      <main>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>

        {mockRecipe.map((recipe, index) => {
          const { image, name, category, id, nationality, type, alcoholicOrNot } = recipe;
          return (
            <div key={ index }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>
                {name}
              </h3>
              {
                type === 'meal'
                  ? (
                    <h5 data-testid={ `${index}-horizontal-top-text` }>
                      {`${nationality} - ${category}`}
                    </h5>
                  )
                  : (
                    <h5 data-testid={ `${index}-horizontal-top-text` }>
                      {category}
                    </h5>
                  )
              }
              {
                type === 'drink' && (
                  <h5 data-testid={ `${index}-horizontal-top-text` }>
                    {alcoholicOrNot}
                  </h5>
                )
              }
              <h6 data-testid={ `${index}-horizontal-done-date` }>
                {new Date().toLocaleDateString()}
              </h6>
              <div>
                <button
                  type="button"
                  onClick={ () => handleClickShareBtn(type, id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="share"
                  />
                </button>
                {shareCopyRender && <h4>Link copied!</h4>}
                <button type="button" onClick={ changeImageFavorite }>
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    // src={ heartIcon }
                    alt="Favoritado"
                  />
                </button>
              </div>

              <p data-testid={ `${index}-${id}-horizontal-tag` }>
                Tags
              </p>
            </div>
          );
        })}
      </main>
    </>
  );
}

export default FavoritedRecipes;
