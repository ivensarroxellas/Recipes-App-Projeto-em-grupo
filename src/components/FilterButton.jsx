import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchButtonDrinksCategory, fetchButtonMealsCategory } from '../service/fetch';
import '../styles/components/CardList.css';

function FilterButton() {
  const { setCategoryFilter,
    filtredCategoryMeals,
    filtredCategoryDrinks,
    setFiltredCategoryMeals,
    setFiltredCategoryDrinks,
  } = useContext(RecipesContext);

  const FIVE = 5;

  const sliceCategoryBtns = (arr) => arr.slice(0, FIVE);

  const [filterButtons, setFilterButtons] = useState([]);

  const handleCleanFilters = () => {
    if (filtredCategoryMeals.length > 0) {
      return setFiltredCategoryMeals([]);
    } if (filtredCategoryDrinks.length > 0) {
      return setFiltredCategoryDrinks([]);
    }
  };

  const history = useHistory();
  const { location: { pathname } } = history;

  const handleButtonFetch = async () => {
    if (pathname === '/meals') {
      setFilterButtons(sliceCategoryBtns(await fetchButtonMealsCategory()));
    } else if (pathname === '/drinks') {
      setFilterButtons(sliceCategoryBtns(await fetchButtonDrinksCategory()));
    }
  };

  useEffect(() => {
    handleButtonFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toogleFilters = () => {
    if (pathname === '/meals') {
      return setFiltredCategoryMeals([]);
    } if (pathname === '/drinks') {
      return setFiltredCategoryDrinks([]);
    }
  };

  const handleChange = ({ target: { name } }) => {
    setCategoryFilter(name);
    toogleFilters();
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
            name={ f.strCategory }
            onClick={ handleChange }
          >
            {f.strCategory}
          </button>
        </div>
      ))}

      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleCleanFilters }
      >
        All
      </button>

    </div>
  );
}

export default FilterButton;
