import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import imageProfile from '../images/profileIcon.svg';

function Profile({ history }) {
  const [email, setEmail] = useState('');

  const getEmailLocalStorage = () => {
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify({}));
    }
    setEmail(JSON.parse(localStorage.getItem('user')));
  };

  useEffect(() => {
    getEmailLocalStorage();
  }, []);

  const clickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <header>
        <Link to="/profile">
          <img
            src={ imageProfile }
            alt="imagem de perfil"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">Profile</h1>
      </header>

      <main>
        <p data-testid="profile-email">
          { email.email }
        </p>
        <div>

          <Link to="/done-recipes" data-testid="profile-done-btn">
            Done Recipes
          </Link>

          <Link to="/favorite-recipes" data-testid="profile-favorite-btn">
            Favorite Recipes
          </Link>

          <Link
            to="/"
            data-testid="profile-logout-btn"
            onClick={ clickLogout }
          >
            Logout
          </Link>

        </div>
      </main>

      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
