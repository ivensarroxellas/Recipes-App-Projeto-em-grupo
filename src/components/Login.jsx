import React, { useState } from 'react';

function Login() {
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
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
