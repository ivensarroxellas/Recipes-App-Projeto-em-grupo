import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/Carousel.css';

function CarouselDrinks() {
  const [drinkRecommended, setDrinkRecommended] = useState([]);
  const carousel = useRef(null);

  useEffect(() => {
    const fetchDrinksRecomended = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.drinks);
        setDrinkRecommended(data.drinks);
        console.log('drinkRecommended', drinkRecommended);
      } catch (error) {
        console.log('erro na API', error);
      }
    };
    fetchDrinksRecomended();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  const NUMBER_SIX = 6;

  if (!drinkRecommended || !drinkRecommended.length) return null;

  return (
    <div className="container">
      {/* <div className="logo">
        <img src="/static/images/super-shoes.png" alt="Super Shoes Logo" />
      </div> */}
      <div className="carousel" ref={ carousel }>
        {drinkRecommended.map((drink, index) => {
          const { idDrink, strDrink, strDrinkThumb } = drink;
          let retorno = '';
          if (index < NUMBER_SIX) {
            retorno = (
              <div
                className="item"
                key={ idDrink }
                data-testid={ `${index}-recommendation-card` }
              >
                <div className="image">
                  <img src={ strDrinkThumb } alt={ strDrink } />
                </div>
                <div className="info">
                  <span
                    className="name"
                    data-testid={ `${index}-recommendation-title` }
                  >
                    { strDrink }
                  </span>
                  {/* <span className="oldPrice">
                  U$
                </span>
                <span className="price">
                  U$
                </span> */}
                </div>
              </div>
            );
          }
          return retorno;
        })}
      </div>
      <div className="buttons">
        <button type="button" onClick={ handleLeftClick }>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Left" />
        </button>
        <button type="button" onClick={ handleRightClick }>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Right" />
        </button>
      </div>
    </div>
  );
}

export default CarouselDrinks;
