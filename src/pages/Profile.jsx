import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import imageProfile from '../images/profileIcon.svg';

function Profile() {
  return (
    <div>
      <h1 data-testid="page-title">Profile</h1>
      <Link to="/profile">
        <img src={ imageProfile } alt="imagem de perfil" data-testid="profile-top-btn" />
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
