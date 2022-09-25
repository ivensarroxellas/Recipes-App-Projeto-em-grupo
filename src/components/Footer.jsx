import React from 'react';
import { Link } from 'react-router-dom';
import imageDrink from '../images/drinkIcon.svg';
import imageMeals from '../images/mealIcon.svg';
import '../styles/components/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="fixed-bottom">
      <div className="container-footer">
        <Link to="/drinks">
          <img
            src={ imageDrink }
            alt="imagem de bebida"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals">
          <img
            src={ imageMeals }
            alt="imagem de comida"
            data-testid="meals-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
