import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginShow = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Cookies.remove("authToken"); // Clear the token
    navigate("/");
  };

  return (
    <nav className="bg-black flex items-center justify-between px-4 h-20 shadow-md">
      {/* Logo */}
      <div
        className="text-white font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="https://i.imgur.com/MaTPR7x.png"
          alt="logo"
          className="h-12 w-auto object-contain" // Ensures proper scaling
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {Cookies.get("authToken") && (
          <>
            <Link
              to="/details"
              className="text-white hover:text-gray-300 transition text-lg"
            >
              Details
            </Link>
            <button
              className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
        {!Cookies.get("authToken") && (
          <button
            className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            onClick={handleLoginShow}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
