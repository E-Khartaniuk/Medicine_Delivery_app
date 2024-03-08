import axios from 'axios';
import React, { useEffect, useState } from 'react';
import css from './DrugsList.module.css';
import MedicineCard from 'components/MedicineCard.jsx/MedicineCard';

function DrugsList() {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  // console.log('medicine', medicines);

  useEffect(() => {
    function fetchData() {
      const URL = `http://localhost:3000/api/medicines`;
      try {
        const response = axios.get(URL).then(res => setMedicines(res.data));
        console.log('response', response.data);
        return response;
      } catch (error) {}
    }
    fetchData();

    const itemsInCart = localStorage.getItem('cart');
    const cartList = JSON.parse(itemsInCart);
    setCart(cartList);
  }, []);

  // const addToCart = medicine => {
  //   setCart([...cart, medicine]);
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // };

  const addToCart = medicine => {
    const isAlreadyInCart = cart.some(item => item._id === medicine._id);
    if (isAlreadyInCart) {
      alert('This item is already in your cart!');
    } else {
      setCart([...cart, { medicine }]);
      localStorage.setItem('cart', JSON.stringify([...cart, medicine]));
    }
  };

  const handleToggleFavorite = medicine => {
    const URL = `http://localhost:3000/api/medicines/${medicine._id}/favorite`;

    try {
      const response = axios.patch(URL, { favorite: true });
      // .then(res => setMedicines(res.data));
      console.log('response', response.data);
      return response;
    } catch (error) {}
  };

  console.log('cart', cart);
  return (
    <section className={css.container}>
      <ul className={css.medicinesList}>
        <MedicineCard
          medicines={medicines}
          addToCart={addToCart}
          handleToggleFavorite={handleToggleFavorite}
        ></MedicineCard>
        {/* {medicines &&
          medicines.map(medicine => {
            return (
              <li className={css.medicinesListItem}>
                <div className={css.imgPlaceholder}></div>
                <h2>{medicine.drug}</h2>
                <p>In stock: {medicine.quantity}</p>
                <p>price: {medicine.price_per_unit}$</p>
                <button type="button" onClick={handleToggleFavorite(medicine)}>
                  {medicine.favorite ? 'favorite item' : 'add to favorite'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(medicine);
                  }}
                >
                  Add to cart
                </button>
              </li>
            );
          })} */}
      </ul>
    </section>
  );
}

export default DrugsList;
