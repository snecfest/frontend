import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Landing from '../pages/Landing'; // Example page component
import Login from '../pages/Login';
import Details from '../pages/Details';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='login' element={<Login />}/>
          <Route path='/details' element={<Details />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
