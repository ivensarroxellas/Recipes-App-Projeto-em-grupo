import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [isDisabled, setisDisabled] = useState(true);

  const { email, password } = userData;

  const handleEnableButton = () => {
    const passwordLength = 6;
    const validatePassword = password.length >= passwordLength;
    const enableButton = email.includes('@')
      && email.toLowerCase().includes('.com') && validatePassword;
    setisDisabled(!enableButton);
  };

  const handleChange = ({ target: { name, value } }) => {
    setUserData({
      ...userData,
      [name]: value,
    });
    handleEnableButton();
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);

    history.push('/meals');
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
