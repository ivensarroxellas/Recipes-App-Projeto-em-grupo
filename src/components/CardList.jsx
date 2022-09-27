import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/components/CardList.css';

function CardList() {
  const { handleInitialFetch, loading, meals, drinks, path } = useContext(RecipesContext);
  const DOZE = 12;

  useEffect(() => {
    handleInitialFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  if (loading) {
    return (
      <p>Carregando...</p>
    );
  } if (path === '/meals') {
    return (
      <>
        {meals.slice(0, DOZE).map((m, index) => (
          <div
            key={ m.strMeal }
            className="div-cardList"
            data-testid={ `${index}-recipe-card` }
          >
            <h4 data-testid={ `${index}-card-name` }>{m.strMeal}</h4>
            <h4>{m.idMeal}</h4>
            <img src={ m.strMealThumb } alt="" data-testid={ `${index}-card-img` } />
          </div>
        ))}
      </>
    );
  } if (path === '/drinks') {
    return (
      <>
        {drinks.slice(0, DOZE).map((m, index) => (
          <div
            key={ m.strDrink }
            className="div-cardList"
            data-testid={ `${index}-recipe-card` }
          >
            <h4 data-testid={ `${index}-card-name` }>{m.strDrink}</h4>
            <h4>{m.idDrink}</h4>
            <img src={ m.strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
          </div>
        ))}
      </>
    );
  }
}

export default CardList;
