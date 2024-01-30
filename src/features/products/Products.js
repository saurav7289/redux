import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsync } from './productsSlice';
import { addAsync } from '../cart/cartSlice';
import './Products.css';

export function Products() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  return (
    <div>
      <div className="main-div">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: '300px', height: '200px' }}
            />
            <h1>{product.title}</h1>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <p>
              <button
                onClick={() => {
                  dispatch(addAsync(product));
                }}
              >
                Add to Cart
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
