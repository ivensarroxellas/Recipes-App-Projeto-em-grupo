const showMealCard = (arr) => arr.map(({ strMeal, strMealThumb, idMeal }, index) => (
  <section
    key={ idMeal }
    data-testid={ `${index}-recipe-card` }
  >
    <h4 data-testid={ `${index}-card-name` }>{strMeal}</h4>
    <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
  </section>
));

const showDrinkCard = (arr) => arr
  .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
    <section
      key={ idDrink }
      data-testid={ `${index}-recipe-card` }
    >
      <h4 data-testid={ `${index}-card-name` }>{strDrink}</h4>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid={ `${index}-card-img` }
      />
    </section>
  ));
export { showMealCard, showDrinkCard };
