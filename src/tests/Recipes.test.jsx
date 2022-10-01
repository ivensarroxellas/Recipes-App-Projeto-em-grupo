import React from 'react';
import { render, screen } from '@testing-library/react';
import Recipes from '../components/Recipes';

describe('', () => {
  it('', () => {
    render(<Recipes />);

    const element = screen.getByText('Recipes');
    expect(element).toBeInTheDocument();
  });
});
