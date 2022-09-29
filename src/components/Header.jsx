import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import FilterButton from './FilterButton';
import SearchBar from './SearchBar';

function Header() {
  const [renderSearchBar, setSearchBar] = useState(false);

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
      <FilterButton />

    </header>
  );
}

export default Header;
