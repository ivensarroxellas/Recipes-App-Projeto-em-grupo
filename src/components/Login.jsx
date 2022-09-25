import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let isDisabled = true;
  const NUMBER_SIX = 6;
  if (/\S+@\S+\.\S+/.test(email) && password.length > NUMBER_SIX) {
    isDisabled = false;
  } else {
    isDisabled = true;
  }

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
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
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            name="email-input"
            id="email-input"
            data-testid="email-input"
            value={ email }
            onChange={ handleChangeEmail }
          />
        </label>

        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            name="password-input"
            id="password-input"
            data-testid="password-input"
            value={ password }
            onChange={ handleChangePassword }
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
