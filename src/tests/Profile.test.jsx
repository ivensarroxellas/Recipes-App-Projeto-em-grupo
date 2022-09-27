import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando componente Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'trybe@trybe.com' }));
  });

  it('Testando se o componente Profile é renderizado corretamente', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const profile = screen.getByText('Profile');
    expect(profile).toBeInTheDocument();

    const logout = screen.getByText('Logout');
    expect(logout).toBeInTheDocument();

    userEvent.click(logout);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});

describe('Testando sem salvar no localStorage', () => {
  it('Testando se as chaves estão salvas no localStorage corretamente', () => {
    renderWithRouter(<App />, ['/profile']);

    localStorage.clear();
    expect(localStorage.store).toEqual(undefined);
  });
});
