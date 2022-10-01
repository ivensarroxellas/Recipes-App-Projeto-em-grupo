import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa componente Header', () => {
  it('testa o comportamento da barra de busca', () => {
    renderWithRouter(<App />, ['/meals']);

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(searchBar).not.toBeInTheDocument();
  });
});
