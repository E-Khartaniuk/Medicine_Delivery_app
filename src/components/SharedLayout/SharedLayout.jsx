import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function SharedLayout() {
  return (
    <>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default SharedLayout;
