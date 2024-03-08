import DrugsList from 'components/DrugsList/DrugsList';
import Shops from 'components/Shops/Shops';
import React from 'react';

import css from './Home.module.css';

function Home() {
  return (
    <div className={css.homecontainer}>
      <Shops></Shops>
      <DrugsList></DrugsList>
    </div>
  );
}

export default Home;
