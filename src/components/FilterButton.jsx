import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/components/CardList.css';

function FilterButton() {
  const { handleButtonFetch, path,
    filterButtons } = useContext(RecipesContext);

  useEffect(() => {
    handleButtonFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  console.log(filterButtons);
  return (
    <div className="div-filterButton">
      {filterButtons.map((f, index) => (
        <div
          key={ index }
        >
          <button
            data-testid={ `${f.strCategory}-category-filter` }
            type="button"
          >
            {f.strCategory}
          </button>
        </div>
      ))}
    </div>
  );
}

export default FilterButton;
