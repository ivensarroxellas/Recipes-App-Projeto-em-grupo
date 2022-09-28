import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { showDrinkCard, showMealCard } from '../service/index';

import '../styles/components/CardList.css';

function CardList() {
  const { filtredMeals, filtredDrinks,
    initialMeals, initialDrinks, path } = useContext(RecipesContext);

  // console.log(handleSliceArr(filtredMeals));
  console.log(filtredDrinks);

  const mealsVerificator = !filtredMeals.length
    ? showMealCard(initialMeals)
    : showMealCard(filtredMeals);

  const drinksVerificator = !filtredDrinks.length
    ? showDrinkCard(initialDrinks)
    : showDrinkCard(filtredDrinks);

  const handleShowRecipes = () => {
    if (path === '/meals') {
      return mealsVerificator;
    } if (path === '/drinks') {
      return drinksVerificator;
    }
  };

  return (

    <div>
      { handleShowRecipes() }
    </div>

  );
}

export default CardList;

// path === '/meals'
//   ? initialMeals
//     .map(({ strMeal, strMealThumb, idMeal }, index) => (
//       <section
//         key={ idMeal }
//         data-testid={ `${idMeal}-recipe-card` }
//       >
//         <h4 data-testid={ `${index}-card-name` }>{strMeal}</h4>
//         <img src={ strMealThumb } alt="" data-testid={ `${index}-card-img` } />
//       </section>
//     ))
//   : initialDrinks
//     .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
//       <section
//         key={ idDrink }
//         data-testid={ `${idDrink}-recipe-card` }
//       >
//         <h4 data-testid={ `${index}-card-name` }>{strDrink}</h4>
//         <img src={ strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
//       </section>
//     ));

// const HandleInitialFetchMeals = async () => {
//   setLoading(true);
//   setMeals(await fetchInitialMeals());
//   setLoading(false);
// };

// const handleInitialFetch = () => {
//   if (path === '/meals') {
//     HandleInitialFetchMeals();
//   }
// };

// useEffect(() => {
//   handleInitialFetch();

// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [path]);

// if (loading) {
//   return (
//     <p>Carregando...</p>
//   );
// }
// if (path === '/meals') {
//   return (
//     <>
//       {meals.slice(0, DOZE).map((m, index) => (
//         <div
//           key={ m.strMeal }
//           className="div-cardRecipe"
//           data-testid={ `${index}-recipe-card` }
//         >
//           <h4 data-testid={ `${index}-card-name` }>{m.strMeal}</h4>
//           <h4>{m.idMeal}</h4>
//           <img src={ m.strMealThumb } alt="" data-testid={ `${index}-card-img` } />
//         </div>
//       ))}
//     </>
//   );
// }
// if (path === '/drinks') {
//   return (
//     <div>
//       {
//         drinks.slice(0, DOZE).map((m, index) => (
//           <div
//             key={ m.strDrink }
//             className="div-cardRecipe"
//             data-testid={ `${index}-recipe-card` }
//           >
//             <h4 data-testid={ `${index}-card-name` }>{m.strDrink}</h4>
//             <h4>{m.idDrink}</h4>
//             <img src={ m.strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
//           </div>
//         ))
//       }
//     </div>
//   );
// }
