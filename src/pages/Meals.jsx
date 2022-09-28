import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardList from '../components/CardList';

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
