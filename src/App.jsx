import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './components/Login';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
