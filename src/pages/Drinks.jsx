import React from 'react';
import Header from '../components/Header';
import CardList from '../components/CardList';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <h1 data-testid="page-title">Drinks</h1>
      <Header />
      <CardList />
      <Footer />
    </div>
  );
}

export default Drinks;
