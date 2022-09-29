import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/components/CardList.css';

function FilterButton() {
  const { handleButtonFetch, pathname,
    filterButtons, setCategoryFilter } = useContext(RecipesContext);

  useEffect(() => {
    handleButtonFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
