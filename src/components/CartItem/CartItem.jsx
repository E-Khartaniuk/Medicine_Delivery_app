import React, { useState } from 'react';

function CartItem({ item, handleCalculateTotalPrice }) {
  const [orderQuantity, setOrderQuantity] = useState(1);

  return (
    <li>
      <h2>{item.drug}</h2>
      <p></p>
      <p>In stock: {item.quantity}</p>
      <p>price: {(item.price_per_unit * orderQuantity).toFixed(2)}$</p>

      <input
        type="number"
        name="quantity"
        value={orderQuantity}
        min="1"
        max={item.quantity}
        onChange={event => {
          //   const newQuantity = parseInt(event.target.value, 10);
          setOrderQuantity(event.target.value);
          handleCalculateTotalPrice({
            ...item,
            order_quantity: event.target.value,
          });
        }}
      />
    </li>
  );
}

export default CartItem;
