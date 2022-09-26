import React from 'react';
import { Link } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header>
      <Link to="/profile">
        <img src={ imageProfile } alt="imagem de perfil" data-testid="profile-top-btn" />
      </Link>
      <img src={ imageSearch } alt="imagem de pesquisa" data-testid="search-top-btn" />

      <SearchBar />
    </header>
  );
}

export default Header;
