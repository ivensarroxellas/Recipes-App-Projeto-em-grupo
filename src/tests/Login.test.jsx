import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const emailValid = 'trybe@trybe.com';
const passwordValid = '123456789';

describe('Testando o componente <Login />', () => {
  it('Testando se os campos de email e senha existe', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const senhaInput = screen.getByLabelText(/senha/i);

    expect(emailInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
    expect(emailInput).toHaveProperty('type', 'email');
    expect(senhaInput).toHaveProperty('type', 'password');
  });

  it('Testando se o usuário pode digitar nos campos', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const senhaInput = screen.getByLabelText(/senha/i);

    userEvent.type(emailInput, emailValid);
    userEvent.type(senhaInput, passwordValid);

    expect(emailInput).toHaveValue(emailValid);
    expect(senhaInput).toHaveValue(passwordValid);
  });

  it('Testando se o botão de login está desabilitado', () => {
    renderWithRouter(<App />);

    const loginButton = screen.getByTestId('login-submit-btn');

    expect(loginButton).toBeDisabled();
  });

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: emailValid }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
  });

  it('Testando se as chaves estão salvas no localStorage corretamente', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const senhaInput = screen.getByLabelText(/senha/i);
    const btnSubmit = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, emailValid);
    userEvent.type(senhaInput, passwordValid);
    userEvent.click(btnSubmit);

    const userLocalStorage = localStorage.getItem('user');
    const mealsTokenLocalStorage = localStorage.getItem('mealsToken');
    const drinksTokenLocalStorage = localStorage.getItem('drinksToken');

    expect(JSON.parse(userLocalStorage)).toStrictEqual({ email: emailValid });
    expect(JSON.parse(mealsTokenLocalStorage)).toStrictEqual(1);
    expect(JSON.parse(drinksTokenLocalStorage)).toStrictEqual(1);
  });
});
