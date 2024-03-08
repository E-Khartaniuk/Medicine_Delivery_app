import Cart from 'pages/Cart/Cart';
import Home from 'pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
