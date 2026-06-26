import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div className="app-container">
      {currentPage === 'landing' && (
        <div className="landing-page">
          <h1 className="landing-title">Paradise Nursery</h1>
          <div style={{ borderBottom: '2px solid white', width: '100px', margin: '10px auto' }}></div>
          <AboutUs />
          <button className="get-started-btn" onClick={() => navigateTo('products')}>
            Get Started
          </button>
        </div>
      )}

      {currentPage === 'products' && (
        <ProductList useNavigate={navigateTo} />
      )}

      {currentPage === 'cart' && (
        <CartItem useNavigate={navigateTo} />
      )}
    </div>
  );
}

export default App;
