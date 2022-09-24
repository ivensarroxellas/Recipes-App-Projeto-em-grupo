import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componente <Login />', () => {
  it('Testando se os campos de email e senha existe', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const senhaInput = screen.getByLabelText(/senha/i);

    expect(emailInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
    expect(emailInput).toHaveProperty('type', 'email');
    expect(senhaInput).toHaveProperty('type', 'password');
  });

  it('Testando se o usuário pode digitar nos campos', () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const senhaInput = screen.getByLabelText(/senha/i);

    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(senhaInput, '123456789');

    expect(emailInput).toHaveValue('trybe@trybe.com');
    expect(senhaInput).toHaveValue('123456789');
  });
});
