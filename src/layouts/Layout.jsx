import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import Navbar

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-grow p-4 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
