import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';

function CartItem({ useNavigate }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 1. Calculate overall items total count
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 2. Calculate global shopping monetary totals
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  // 3. Compute costs matching isolated specific plant rows
  const calculateSubtotal = (item) => {
    return item.cost * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleCheckout = () => {
    alert("Coming Soon! Thank you for supporting Paradise Nursery.");
  };

  return (
    <div>
      {/* Header View Synchronization */}
      <nav className="navbar">
        <h2 onClick={() => useNavigate('landing')} style={{ cursor: 'pointer' }}>Paradise Nursery</h2>
        <div className="nav-links">
          <span onClick={() => useNavigate('landing')}>Home</span>
          <span onClick={() => useNavigate('products')}>Plants</span>
          <div className="cart-icon-container" onClick={() => useNavigate('cart')} style={{ display: 'inline-block' }}>
            <span>🛒 Cart</span>
            {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          </div>
        </div>
      </nav>

      {/* Cart Container Elements */}
      <div className="cart-container">
        <h2 style={{ textAlign: 'center' }}>Your Shopping Cart</h2>
        <h4 style={{ textAlign: 'center' }}>Total Plants: {totalQuantity}</h4>
        <h3 style={{ textAlign: 'center', color: '#2e7d32' }}>Total Order Amount: ${calculateTotalAmount()}</h3>

        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', margin: '40px 0' }}>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div style={{ flex: 1, paddingLeft: '20px' }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                  <p style={{ margin: '0', color: '#666' }}>Unit Price: ${item.cost}</p>
                  <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>Subtotal: ${calculateSubtotal(item)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '20px' }}>
                  <button className="quantity-btn" onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(item.name)}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button 
            className="add-to-cart-btn" 
            style={{ width: 'auto', padding: '12px 20px', backgroundColor: '#666' }}
            onClick={() => useNavigate('products')}
          >
            Continue Shopping
          </button>
          <button 
            className="add-to-cart-btn" 
            style={{ width: 'auto', padding: '12px 20px' }}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
