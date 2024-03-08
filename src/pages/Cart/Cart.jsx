import CartItem from 'components/CartItem/CartItem';
import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOerder, setTotalOrder] = useState([]);

  const calculateInitialPrice = cartList => {
    const initialTotal = cartList.reduce((acc, item) => {
      return item.price_per_unit + acc;
    }, 0);
    setTotalPrice(initialTotal);
  };

  useEffect(() => {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    setCartList(cartList);

    calculateInitialPrice(cartList);
    // const initialTotal = cartList.reduce((acc, item) => {
    //   return item.price_per_unit + acc;
    // }, 0);
    // setTotalPrice(initialTotal);
  }, []);

  console.log('totalPrice', totalPrice);

  useEffect(() => {
    const totalCartPrice = totalOerder.reduce((acc, item) => {
      const total = item.price_per_unit * item.order_quantity + acc;
      return total;
    }, 0);

    setTotalPrice(totalCartPrice);
  }, [totalOerder]);

  const handleCalculateTotalPrice = newItem => {
    const existingItem = totalOerder.find(order => order._id === newItem._id);
    if (existingItem) {
      setTotalOrder(prevOrder =>
        prevOrder.map(order => (order._id === newItem._id ? newItem : order))
      );

      setTotalOrder(prevOrder => [
        ...prevOrder,
        { ...newItem, order_quantity: 1 },
      ]);
    }
  };

  // const calculateTotalPrice = () => {};
  //
  return (
    <div>
      <div>
        <ul>
          {cartList.map(item => {
            return (
              <CartItem
                key={item._id}
                item={item}
                handleCalculateTotalPrice={handleCalculateTotalPrice}
              ></CartItem>
            );
          })}
        </ul>
      </div>

      <p>Total price: {totalPrice}$</p>
    </div>
  );
}

export default Cart;
