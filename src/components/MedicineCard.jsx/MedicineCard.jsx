import React from 'react';
import css from './MedicineCard.module.css';

function MedicineCard({ medicines, addToCart, handleToggleFavorite }) {
  return medicines.map(medicine => {
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
  });
}

export default MedicineCard;
