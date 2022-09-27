import React from 'react';
import Header from '../components/Header';
import CardList from '../components/CardList';
import Footer from '../components/Footer';

function Meals() {
  return (
    <div>
      <h1 data-testid="page-title">Meals</h1>
      <Header />
      <CardList />
      <Footer />
    </div>
  );
}

export default Meals;
