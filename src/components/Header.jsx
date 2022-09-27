import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [renderSearchBar, setSearchBar] = useState(false);
  const { setPath } = useContext(RecipesContext);

  const history = useHistory();

  const { location: { pathname } } = history;

  setPath(pathname);

  const showSearchBar = () => {
    if (renderSearchBar) {
      setSearchBar(false);
    } else { setSearchBar(true); }
  };
  return (
    <header>
      <Link to="/profile">
        <img src={ imageProfile } alt="imagem de perfil" data-testid="profile-top-btn" />
      </Link>
      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ showSearchBar }
        src={ imageSearch }
        alt="img"
      >
        <img src={ imageSearch } alt="" />
      </button>
      {renderSearchBar && <SearchBar />}

    </header>
  );
}

export default Header;
