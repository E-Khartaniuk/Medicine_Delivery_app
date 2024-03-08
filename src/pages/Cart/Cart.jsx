import CartItem from 'components/CartItem/CartItem';
import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOerder, setTotalOrder] = useState([]);

  useEffect(() => {
    const medicinesFromLS = JSON.parse(localStorage.getItem('cart'));
    if (medicinesFromLS) {
      const addOrderQuantity = medicinesFromLS.map(medicine => {
        return { ...medicine, order_quantity: 1 };
      });
      setCartList(addOrderQuantity);
      setTotalOrder(addOrderQuantity);
      const initialTotal = addOrderQuantity.reduce((acc, item) => {
        return item.price_per_unit + acc;
      }, 0);

      setTotalPrice(initialTotal);
    }
  }, []);

  useEffect(() => {
    const totalCartPrice = totalOerder.reduce((acc, item) => {
      const total = item.price_per_unit * item.order_quantity + acc;
      return total;
    }, 0);

    setTotalPrice(totalCartPrice);
  }, [totalOerder]);

  const handleCalculateTotalPrice = newItem => {
    // const existingItem = totalOerder.find(order => order._id === newItem._id);
    // console.log('existingItem', existingItem);
    console.log('newItem', newItem);
    // if (existingItem) {
    setTotalOrder(prevOrder =>
      prevOrder.map(order => (order._id === newItem._id ? newItem : order))
    );
  };

  return (
    <div>
      {cartList.length ? (
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
          <p>Total price: {totalPrice.toFixed(2)}$</p>
        </div>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
}

export default Cart;
