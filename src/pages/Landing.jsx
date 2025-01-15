import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  console.log('Landing page component rendered');

  const handleNavigate = () => {
    navigate('/details');
  };

  return (
    <div className="relative h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Small Image */}
      <div className="w-full max-w-sm mb-6">
        <img
          src="https://i.imgur.com/MaTPR7x.png"
          alt="SNEC Knowledge Festival"
          className="w-full object-contain"
        />
      </div>

      {/* Text Content */}
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          SNEC KNOWLEDGE FESTIVAL
        </h1>
        <p className="text-md md:text-xl font-medium mb-6">
          OFF STAGE EVENT REGISTRATION
        </p>
        <button
          onClick={handleNavigate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md text-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Landing;
