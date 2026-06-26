import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ useNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Total items in cart for the dynamic counter badge
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantCategories = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", price: "$15", image: "https://unsplash.com", description: "Hardy plant that purifies indoor ambient air." },
        { name: "Spider Plant", price: "$12", image: "https://unsplash.com", description: "Easy to grow trailing vines with small offshoots." }
      ]
    },
    {
      category: "Aromatic Houseplants",
      plants: [
        { name: "Lavender", price: "$18", image: "https://unsplash.com", description: "Calming sweet aroma perfect for relaxation zones." },
        { name: "Rosemary", price: "$14", image: "https://unsplash.com", description: "Fragrant herb that doubles perfectly for culinary use." }
      ]
    },
    {
      category: "Low Maintenance Greens",
      plants: [
        { name: "ZZ Plant", price: "$22", image: "https://unsplash.com", description: "Thrives perfectly fine even in deep dim lighting." },
        { name: "Pothos", price: "$10", image: "https://unsplash.com", description: "Quick-growing evergreen vine requiring minimal care." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      {/* Header/Navbar Component */}
      <nav className="navbar">
        <h2 onClick={() => useNavigate('landing')} style={{ cursor: 'pointer' }}>Paradise Nursery</h2>
        <div className="nav-links">
          <span onClick={() => useNavigate('landing')}>Home</span>
          <span onClick={() => useNavigate('products')}>Plants</span>
          <div className="cart-icon-container" onClick={() => useNavigate('cart')} style={{ display: 'inline-block' }}>
            <span>🛒 Cart</span>
            {totalCartCount > 0 && <span className="cart-badge">{totalCartCount}</span>}
          </div>
        </div>
      </nav>

      {/* Main Product Categories and Grid */}
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#2e7d32' }}>Our Botanical Collection</h1>
        {plantCategories.map((cat, index) => (
          <div key={index} className="category-section">
            <h2>{cat.category}</h2>
            <div className="product-grid">
              {cat.plants.map((plant, pIdx) => (
                <div key={pIdx} className="product-card">
                  <img src={plant.image} alt={plant.name} className="product-image" />
                  <h3>{plant.name}</h3>
                  <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#666' }}>{plant.description}</p>
                  <p style={{ fontWeight: 'bold' }}>{plant.price}</p>
                  <button 
                    className="add-to-cart-btn"
                    disabled={isPlantInCart(plant.name)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isPlantInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
