import history from './history';

function getCurrentURL() {
  return window.location;
}

const handleRedirect = (id) => {
  const url = getCurrentURL();
  const { pathname } = url;
  if (pathname.includes('drinks')) {
    history.push(`/drinks/${id}`);
    window.location.reload(true);
  }
  if (pathname.includes('meals')) {
    history.push(`/meals/${id}`);
    window.location.reload(true);
  }
};
const showMealCard = (arr) => arr.map(({ strMeal, strMealThumb, idMeal }, index) => (
  <section
    key={ idMeal }
  >
    <h4 data-testid={ `${index}-card-name` }>{strMeal}</h4>
    <button
      key={ index }
      data-testid={ `${index}-recipe-card` }
      type="button"
      name="recipes"
      onClick={ () => handleRedirect(idMeal) }
    >
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid={ `${index}-card-img` }
      />
    </button>
  </section>
));

const showDrinkCard = (arr) => arr
  .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
    <section
      key={ idDrink }
    >
      <h4 data-testid={ `${index}-card-name` }>{strDrink}</h4>
      <button
        key={ index }
        data-testid={ `${index}-recipe-card` }
        type="button"
        name="recipes"
        onClick={ () => handleRedirect(idDrink) }
      >
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
        />
      </button>
    </section>
  ));
export { showMealCard, showDrinkCard };
