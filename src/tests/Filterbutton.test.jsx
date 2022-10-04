// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from './helpers/renderWithRouter';
// import App from '../App';
// import mealCategories from '../../cypress/mocks/mealCategories';
// import drinkCategories from '../../cypress/mocks/drinkCategories';

// describe('Testando os botões de filtragem', () => {
//   // beforeEach(() => {
//   //   renderWithRouter(<App />, ['/meals']);
//   // });

//   test(
//     'Os 5 primeiros filtros*(/meals)* por categoria, devem ser renderizados',
//     async () => {
//       global.fetch = jest.fn(() => Promise.resolve({
//         json: () => Promise.resolve(mealCategories),
//       }));

//       renderWithRouter(<App />, ['/meals']);
//       const buttonsCategotyIdsMeals = ['Beef-category-filter',
//         'Breakfast-category-filter',
//         'Chiken-category-filter', 'Dessert-category-filter', 'Goat-category-filter'];

//       waitFor(() => buttonsCategotyIdsMeals.forEach((testId) => {
//         const buttonCategory = screen.getByTestId(testId);
//         expect(buttonCategory).toBeInTheDocument();
//       }));
//     },
//   );

//   test(
//     'Os 5 primeiros filtros*(/drinks)* por categoria, devem ser renderizados',
//     async () => {
//       global.fetch = jest.fn(() => Promise.resolve({
//         json: () => Promise.resolve(drinkCategories),
//       }));

//       const { history } = renderWithRouter(<App />, ['/drinks']);

//       // const btnDrinks = screen.getByTestId('drinks-bottom-btn');
//       // userEvent.click(btnDrinks);

//       // expect(history.location.pathname).toBe('/drinks');

//       const buttonsCategotyIdsDrinks = ['Ordinary Drink-category-filter',
//         'Cocktail-category-filter', 'Shake-category-filter',
//         'Other/Unknown-category-filter', 'Cocoa-category-filter'];

//       await waitFor(() => buttonsCategotyIdsDrinks.forEach((testId) => {
//         const buttonCategory = screen.getByTestId(testId);
//         expect(buttonCategory).toBeInTheDocument();
//       }));
//     },
//   );
// });
