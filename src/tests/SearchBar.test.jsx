import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import chickenMeals from '../../cypress/mocks/chickenMeals';

const INPUT_SEARCHID = 'search-input';
const BUTTON_SEARCHID = 'exec-search-btn';
describe('Testando a SearchBar', () => {
  beforeEach(() => {
    renderWithRouter(<App />, ['/meals']);

    const btnSearchBar = screen.getByTestId('search-top-btn');
    userEvent.click(btnSearchBar);

    const searchBar = screen.getByTestId('search-bar-content');
    expect(searchBar).toBeInTheDocument();
  });

  test('Selecionando o radio "Ingrediente", a busca retorna as receitas', () => {
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const inputSearch = screen.getByTestId(INPUT_SEARCHID);
    const btnSearch = screen.getByTestId(BUTTON_SEARCHID);

    userEvent.click(radioIngredient);
    expect(radioIngredient.value).toBe('ingredient');
    userEvent.type(inputSearch, 'Chicken');
    userEvent.click(btnSearch);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(chickenMeals),
    }));
  });
});
