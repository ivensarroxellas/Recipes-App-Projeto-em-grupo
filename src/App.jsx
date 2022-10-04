import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './components/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDrinksDetails from './pages/RecipeDrinksDetails';
import RecipeMealsDetails from './pages/RecipeMealsDetails';
import MealRecipeInProgress from './pages/MealRecipeInProgress';
import DrinkRecipeInProgress from './pages/DrinkRecipeInProgress';
import FavoritedRecipes from './pages/FavoritedRecipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/meals/:id" component={ RecipeMealsDetails } />
        <Route exact path="/meals/:id/in-progress" component={ MealRecipeInProgress } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ RecipeDrinksDetails } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkRecipeInProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoritedRecipes } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
