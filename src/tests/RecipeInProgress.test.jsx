import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeInProgress from '../components/RecipeInProgress';

describe('', () => {
  it('', () => {
    render(<RecipeInProgress />);

    const element = screen.getByTestId('coxinha');
    expect(element).toBeInTheDocument();
  });
});
