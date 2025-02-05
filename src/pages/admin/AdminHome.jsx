import React, { useState, useEffect } from "react";
import { fetchAdminData } from "../../services/AdminService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminHome = () => {
  const [token, setToken] = useState("");
  const [submittedToken, setSubmittedToken] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = async () => {
    if (!token.trim()) {
      alert("Please enter a token!");
      return;
    }

    try {
      const response = await fetchAdminData(token);
      if (response.success) {
        setSubmittedToken(token);
        setData(response.data);
        console.log("Token submitted successfully");
      } else {
        console.log("Failed to submit token");
      }
    } catch (error) {
      console.error("Error submitting token:", error);
    }

    setToken(""); // Clear input after submission
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Section */}
      <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        {!submittedToken && (
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
        )}
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Home</h2>

        {data ? (
          <div>
            {/* Program-wise Data */}
            <h3 className="text-xl font-semibold mt-6">Programs and Student Count</h3>
            <div className="bg-white p-4 rounded shadow-md">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.programTotals}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalStudents" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* College-wise Data */}
            <h3 className="text-xl font-semibold mt-6">Colleges and Programs</h3>
            <div className="bg-white p-4 rounded shadow-md">
              {data.colleges.map((college, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-bold">{college.name}</h4>
                  <ul className="list-disc pl-5">
                    {college.programs.map((program, idx) => (
                      <li key={idx}>
                        {program.name} ({program.studentCount} students)
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-lg">Enter a token to view data.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
