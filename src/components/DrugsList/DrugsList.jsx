import axios from 'axios';
import React, { useEffect, useState } from 'react';
import css from './DrugsList.module.css';
import MedicineCard from 'components/MedicineCard.jsx/MedicineCard';

function DrugsList() {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  function fetchData() {
    const URL = `http://localhost:3000/api/medicines`;
    try {
      const response = axios.get(URL).then(res => setMedicines(res.data));
      return response;
    } catch (error) {
      console.log('error', error);
    }
  }
  useEffect(() => {
    fetchData();

    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);
  // console.log('medicines', medicines);

  // const addToCart = medicine => {
  //   setCart([...cart, medicine]);
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // };

  const addToCart = medicine => {
    const isAlreadyInCart = cart.some(item => item._id === medicine._id);
    if (isAlreadyInCart) {
      alert('This item is already in your cart!');
    } else {
      const updatedCart = [...cart, medicine]; // Обновляем состояние корзины
      setCart(updatedCart); // Устанавливаем новое состояние корзины
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Сохраняем корзину в Local Storage
    }
  };

  const handleToggleFavorite = (medicine, favorite) => {
    const URL = `http://localhost:3000/api/medicines/${medicine._id}/favorite`;

    try {
      const response = axios.patch(URL, { favorite }).then(res => {
        console.log('res', res);
        fetchData();
      });
      return response;
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <section className={css.container}>
      <ul className={css.medicinesList}>
        <MedicineCard
          medicines={medicines}
          addToCart={addToCart}
          handleToggleFavorite={handleToggleFavorite}
        ></MedicineCard>
      </ul>
    </section>
  );
}

export default DrugsList;
