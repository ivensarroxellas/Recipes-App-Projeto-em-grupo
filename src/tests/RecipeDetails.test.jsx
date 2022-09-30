import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipesDetails from '../components/RecipeDetails';

describe('', () => {
  it('', () => {
    render(<RecipesDetails />);

    const element = screen.getByText('RecipesDetails');
    expect(element).toBeInTheDocument();
  });
});
