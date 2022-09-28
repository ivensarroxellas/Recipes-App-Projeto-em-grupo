import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../styles/components/CardList.css';

function FilterButton() {
  const { handleButtonFetch, path,
    filterButtons, loading } = useContext(RecipesContext);
  const CINCO = 5;

  useEffect(() => {
    handleButtonFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  if (loading) {
    return (
      <p>Carregando...</p>
    );
  } return (
    <div className="div-filterButton">
      {filterButtons.slice(0, CINCO).map((f, index) => (
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
