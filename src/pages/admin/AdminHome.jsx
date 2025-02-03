import React, { useState } from "react";
import { fetchAdminData } from "../../services/AdminService";

const AdminHome = () => {
  const [token, setToken] = useState("");
  const [submittedToken, setSubmittedToken] = useState(null);

  const handleSubmit = async() => {
    if (!token.trim()) {
      alert("Please enter a token!");
      return;
    }

    try {
      const response = await fetchAdminData(token)

      if (response.status === 200) {
        setSubmittedToken(token);
        // setMessage("Token submitted successfully!");
        console.log('token submitted successfully')
      } else {
        // setMessage("Failed to submit token.");
        console.log('failed to submit token')
      }
    } catch (error) {
      console.error("Error submitting token:", error);
      // setMessage("An error occurred. Please try again.");
    }

    setToken(""); // Clear input after submission
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Section */}
      <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        
      {!submittedToken &&
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="px-4 py-2 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Submit
          </button>
        </div>
      }
      </nav>

      

      {/* Main Content */}
      <div className="p-6">
        <p className="text-lg">This is the Admin Home page.</p>
      </div>
    </div>
  );
};

export default AdminHome;
