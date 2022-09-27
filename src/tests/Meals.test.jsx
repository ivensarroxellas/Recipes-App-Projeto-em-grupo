import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando as buscas da pagina "/Meals"', () => {
  beforeEach(() => {
    renderWithRouter(<App />, ['/meals']);

    const testIds = ['page-title', 'footer', 'profile-top-btn',
      'search-top-btn', 'drinks-bottom-btn', 'meals-bottom-btn'];

    testIds.forEach((testId) => {
      const input = screen.getByTestId(testId);
      expect(input).toBeInTheDocument();
    });
  });

  test('Ao clicar no botão de "Profile", redireciona para pagina "/profile"', () => {
    const btnProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(btnProfile);

    const { history } = renderWithRouter(<App />, ['/profile']);

    expect(history.location.pathname).toBe('/profile');
    history.push('/feedback');

    const tittleProfile = screen.getByRole('heading', { name: /profile/i });
    expect(tittleProfile).toBeInTheDocument();
  });

  test('Ao clicar no botão de "Drinks", redireciona para pagina "/drinks"', () => {
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(btnDrinks);

    const { history } = renderWithRouter(<App />, ['/drinks']);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('Ao clicar no icone da "Lupa", a searchBar deve ser renderizada', () => {
    const btnSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(btnSearchBar);

    const searchBar = screen.getByTestId('search-bar-content');
    expect(searchBar).toBeInTheDocument();
  });
});
