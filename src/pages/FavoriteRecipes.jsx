import React from 'react';
import { Link } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';

function FavoriteRecipes() {
  return (
    <div>
      <h1 data-testid="page-title">Favorite Recipes</h1>
      <Link to="/profile" data-testid="profile-top-btn">
        <img src={ imageProfile } alt="imagem de perfil" data-testid="profile-top-btn" />
      </Link>
    </div>
  );
}

export default FavoriteRecipes;
