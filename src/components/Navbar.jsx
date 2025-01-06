import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate()
    const handleLoginShow=()=>{
        navigate('/login')
    }
    const handleHomeDirect=()=>{
        navigate('/')
    }
  return (
    <nav className="bg-black flex items-center justify-between px-4 h-20 shadow-md">
      <div className="text-white font-bold text-xl" 
        onClick={handleHomeDirect} 
      >
        SnecFest
      </div>
      
      <div>
        <button className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
         onClick={handleLoginShow}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
