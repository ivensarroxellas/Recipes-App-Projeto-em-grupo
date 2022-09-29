import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import '../styles/components/CardList.css';

function FilterButton() {
  const SLICER5 = 5;
  const slicer5 = (arr) => arr.slice(0, SLICER5);

  const { setCategoryFilter } = useContext(RecipesContext);

  const [filterButtons, setFilterButtons] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;

  const fetchButtonMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals } = await response.json();
    return setFilterButtons(slicer5(meals));
  };

  const fetchButtonDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { drinks } = await response.json();
    return setFilterButtons(slicer5(drinks));
  };

  const handleButtonFetch = () => {
    if (pathname === '/meals') {
      fetchButtonMeals();
    } else if (pathname === '/drinks') {
      fetchButtonDrinks();
    }
  };
  console.log(pathname);
  useEffect(() => {
    handleButtonFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // console.log(filterButtons);
  const handleChange = ({ target: { value } }) => {
    setCategoryFilter(value);
  };

  return (
    <div className="div-filterButton">
      {filterButtons.map((f, index) => (
        <div
          key={ index }
        >
          <button
            data-testid={ `${f.strCategory}-category-filter` }
            type="button"
            value={ f.strCategory }
            onClick={ handleChange }
          >
            {f.strCategory}
          </button>
        </div>
      ))}
    </div>
  );
}

export default FilterButton;
