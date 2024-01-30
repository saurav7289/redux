import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAsync, updateAsync } from './cartSlice';
import './Cart.css';

export function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleChange = (e, id) => {
    console.log(id, e.target.value);
    dispatch(updateAsync({ id, change: { quantity: +e.target.value } }));
  };

  return (
    <div>
      <div>
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <img className="img-fluid" src={item.thumbnail} alt={item.title} />
            <div className="description">
              <p>{item.title}</p>
              <span>{item.brand}</span>
              <strong>${item.price}</strong>
            </div>
            <div className="quantity">
              Quantity
              <select
                value={item.quantity}
                onChange={(e) => handleChange(e, item.id)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="close">
              <button onClick={() => dispatch(deleteAsync(item.id))}>X</button>
            </div>
          </div>
        ))}
        <h4>
          Total :{' '}
          {items.reduce((acc, item) => item.price * item.quantity + acc, 0)}
        </h4>
      </div>
    </div>
  );
}
