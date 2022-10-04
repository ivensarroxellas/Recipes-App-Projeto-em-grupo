import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoritedRecipes() {
  const [shareCopyRender, setShareCopyRender] = useState(false);
  const [getRecipeStorage, setGetRecipeStorage] = useState([]);
  const [showRecipe, setShowRecipe] = useState([]);
  const [favIcon, setFavIcon] = useState(true);

  const loadLocalStorage = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocalStorage) {
      setGetRecipeStorage(getLocalStorage);
    }
    setShowRecipe(getLocalStorage);
  };

  useEffect(() => {
    loadLocalStorage();
    console.log('showRecipe', showRecipe);
    console.log('getRecipeStorage', getRecipeStorage);
    // eslint-disable-next-line
  }, []);

  const handleFavorite = (id) => {
    const newRecipeStorage = getRecipeStorage.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipeStorage));
    setFavIcon(false);
    loadLocalStorage();
  };

  function handleClickShareBtn(type, id) {
    if (type === 'meal') {
      console.log(type);
      copy(`http://localhost:3000/meals/${id}`);
    }
    setShareCopyRender(true);
  }

  const handleFilterMeals = () => {
    const filterRecipe = getRecipeStorage.filter(({ type }) => type === 'meal');
    setShowRecipe(filterRecipe);
  };

  const handleFilterDrinks = () => {
    const filterRecipe = getRecipeStorage.filter(({ type }) => type === 'drink');
    setShowRecipe(filterRecipe);
  };

  const handleFilterAll = () => {
    setShowRecipe(getRecipeStorage);
  };

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
          onClick={ handleFilterAll }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ handleFilterMeals }
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilterDrinks }
        >
          Drinks
        </button>

        {showRecipe && showRecipe.map((
          { image, name, category, id, nationality, type, alcoholicOrNot },
          index,
        ) => (
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
              <button type="button" onClick={ () => handleFavorite(id) }>
                { favIcon
                  ? (
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="favorite"
                    />
                  )
                  : (
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ whiteHeartIcon }
                      alt="not favorite"
                    />
                  )}
              </button>
            </div>

            <p data-testid={ `${index}-${id}-horizontal-tag` }>
              Tags
            </p>
          </div>
        ))}
      </main>
    </>
  );
}

export default FavoritedRecipes;
