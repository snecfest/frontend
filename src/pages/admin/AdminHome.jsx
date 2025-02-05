import React, { useState } from "react";
import { fetchAdminData } from "../../services/AdminService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AdminHome = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);
  const [expandedColleges, setExpandedColleges] = useState({});
  const [expandedPrograms, setExpandedPrograms] = useState({});
  
  const handleSubmit = async () => {
    if (!token.trim()) {
      alert("Please enter a token!");
      return;
    }
    try {
      const response = await fetchAdminData(token);
      if (response.success) {
        setData(response.data);
      } else {
        console.log("Unexpected API Response:", response);
      }
    } catch (error) {
      console.error("Error submitting token:", error);
    }
    setToken("");
  };
  
  const toggleCollege = (collegeId) => {
    setExpandedColleges((prev) => ({ ...prev, [collegeId]: !prev[collegeId] }));
  };
  
  const toggleProgram = (programName) => {
    setExpandedPrograms((prev) => ({ ...prev, [programName]: !prev[programName] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="px-4 py-2 rounded-md text-black border border-gray-300"
          />
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md">Submit</button>
        </div>
      </nav>

      {data && (
        <>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold">Student Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.programTotals}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalStudents" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold">Participation Percentage</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={data.programTotals} dataKey="percentage" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {data.programTotals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#FFBB28" : "#0088FE"} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="bg-green-500 px-4 py-2 rounded-md text-white">View Reports</button>
            <button className="bg-purple-500 px-4 py-2 rounded-md text-white">Export Data</button>
            <button className="bg-red-500 px-4 py-2 rounded-md text-white">Manage Users</button>
          </div>
          <h2 className="text-xl font-semibold mt-6">Colleges</h2>
          {data.colleges.map((college) => (
            <div key={college._id} className="bg-white p-4 rounded-md shadow-md mb-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{college.name}</h3>
                <button onClick={() => toggleCollege(college._id)} className="px-3 py-1 bg-gray-800 text-white rounded-md">
                  {expandedColleges[college._id] ? "Collapse" : "View Details"}
                </button>
              </div>
              {expandedColleges[college._id] && (
                <div className="mt-2">
                  <p><strong>Place:</strong> {college.place}</p>
                  <h4 className="mt-2 font-medium">Programs:</h4>
                  {college.programs.map((program) => (
                    <p key={program.uniqueCode}>{program.name} - {program.category} ({program.studentCount} students)</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AdminHome;
