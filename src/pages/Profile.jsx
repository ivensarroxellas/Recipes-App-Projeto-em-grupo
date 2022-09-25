import React from 'react';
import { Link } from 'react-router-dom';
import imageProfile from '../images/profileIcon.svg';

function Profile() {
  return (
    <div>
      <h1 data-testid="page-title">Profile</h1>
      <Link to="/profile">
        <img src={ imageProfile } alt="imagem de perfil" data-testid="profile-top-btn" />
      </Link>
    </div>
  );
}

export default Profile;
