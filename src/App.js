import React, { useState, useEffect } from 'react';
import './App.css';
import { Products } from './features/products/Products';
import { Cart } from './features/cart/Cart';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsync } from './features/cart/cartSlice';

function App() {
  const items = useSelector((state) => state.cart.items);
  const [usecart, setUsecart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  return (
    <div className="App">
      <button
        style={{
          position: 'fixed',
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '5px',
          border: 'none',
        }}
        onClick={() => setUsecart(!usecart)}
      >
        {usecart ? 'product Page' : `Cart [${items.length}]`}
      </button>
      {usecart ? <Cart></Cart> : <Products></Products>}
    </div>
  );
}

export default App;
