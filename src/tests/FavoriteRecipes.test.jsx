import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('', () => {
  it('', () => {
    render(<FavoriteRecipes />);

    const element = screen.getByTestId('coxinha');
    expect(element).toBeInTheDocument();
  });
});
