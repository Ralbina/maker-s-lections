import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './componenrs/Home';
import Login from './componenrs/Login';
import Registration from './componenrs/Registration';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default MainRoutes;
