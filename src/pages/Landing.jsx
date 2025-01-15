import React from 'react';

const Landing = () => {
  console.log('Landing page component rendered');

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://i.imgur.com/2jgCx6M.png')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
          SNEC KNOWLEDGE FESTIVAL
        </h1>
        <p className="text-lg md:text-2xl font-medium mb-8">
          OFF STAGE EVENT REGISTRATION
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md text-lg shadow-lg transition-transform transform hover:scale-105">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Landing;
