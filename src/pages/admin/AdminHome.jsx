import React, { useState } from "react";
import { fetchAdminData } from "../../services/AdminService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminHome = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

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
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Submit
          </button>
        </div>
      </nav>

      {data && (
        <>
          {/* Diagrams Section */}
          <div className="bg-white p-4 rounded-md shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-3">Student Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.programTotals}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalStudents" fill="#3182CE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table View for Colleges and Programs */}
          <h2 className="text-xl font-semibold mt-6">Colleges and Programs</h2>
          <table className="w-full bg-white shadow-md rounded-md mt-4">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">College</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Programs</th>
              </tr>
            </thead>
            <tbody>
              {data.colleges.map((college) => (
                <tr key={college._id} className="border-b">
                  <td className="py-2 px-4 font-medium">{college.name}</td>
                  <td className="py-2 px-4">{college.place}</td>
                  <td className="py-2 px-4">
                    {college.programs.map((program) => (
                      <button
                        key={program.uniqueCode}
                        onClick={() => setSelectedProgram(program)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        {program.name}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Custom Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl font-semibold">{selectedProgram.name}</h2>
            <h4 className="mt-2 font-medium">Students:</h4>
            {selectedProgram.students.map((student) => (
              <p key={student.studentId}>{student.name} ({student.studentId})</p>
            ))}
            <button
              onClick={() => setSelectedProgram(null)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;