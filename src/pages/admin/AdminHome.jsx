import React, { useState, useEffect } from "react";
import { fetchAdminData } from "../../services/AdminService";
import Modal from "../../components/Modal";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminHome = () => {
  const [token, setToken] = useState("");
  const [submittedToken, setSubmittedToken] = useState(null);
  const [data, setData] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [expandedPrograms, setExpandedPrograms] = useState({});
  const [expandedColleges, setExpandedColleges] = useState({});

  // Fetch Data when Token is Submitted
  const handleSubmit = async () => {
    if (!token.trim()) {
      alert("Please enter a token!");
      return;
    }
    try {
      const response = await fetchAdminData(token);
      console.log("Full API Response:", response); // Debugging Log
  
      if (response.status === 200 && response.data) {
        setData(response.data);
        setSubmittedToken(token);
        console.log("Token submitted successfully", response.data);
      } else {
        console.log("Unexpected API Response:", response);
      }
    } catch (error) {
      console.error("Error submitting token:", error);
    }
    setToken("");
  };
  

  // Toggle Expand/Collapse Programs
  const toggleProgram = (programName) => {
    setExpandedPrograms((prev) => ({
      ...prev,
      [programName]: !prev[programName],
    }));
  };

  // Toggle Expand/Collapse Colleges
  const toggleCollege = (collegeId) => {
    setExpandedColleges((prev) => ({
      ...prev,
      [collegeId]: !prev[collegeId],
    }));
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
        {!data ? (
          <p className="text-lg">Submit a token to load data.</p>
        ) : (
          <>
            {/* College-wise Section */}
            <h2 className="text-xl font-semibold mt-6 mb-3">Colleges</h2>
            {data.colleges.map((college) => (
              <div key={college._id} className="bg-white p-4 rounded-md shadow-md mb-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{college.name}</h3>
                  <button
                    onClick={() => toggleCollege(college._id)}
                    className="px-3 py-1 bg-gray-800 text-white rounded-md"
                  >
                    {expandedColleges[college._id] ? "Collapse" : "View Details"}
                  </button>
                </div>
                {expandedColleges[college._id] && (
                  <div className="mt-2">
                    <p><strong>Place:</strong> {college.place}</p>
                    <h4 className="mt-2 font-medium">Programs:</h4>
                    {college.programs.map((program) => (
                      <div key={program.uniqueCode} className="ml-4">
                        <p>{program.name} - {program.category} ({program.studentCount} students)</p>
                        <button
                          onClick={() => setSelectedProgram(program)}
                          className="text-blue-600 hover:underline"
                        >
                          View Students
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Program-wise Section */}
            <h2 className="text-xl font-semibold mt-6 mb-3">Programs</h2>
            {data.programTotals.map((program) => (
              <div key={program.name} className="bg-white p-4 rounded-md shadow-md mb-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{program.name} - {program.category}</h3>
                  <button
                    onClick={() => toggleProgram(program.name)}
                    className="px-3 py-1 bg-gray-800 text-white rounded-md"
                  >
                    {expandedPrograms[program.name] ? "Collapse" : "View Students"}
                  </button>
                </div>
                {expandedPrograms[program.name] && (
                  <div className="mt-2">
                    <h4 className="mt-2 font-medium">Colleges Offering This Program:</h4>
                    <ul className="list-disc ml-5">
                      {program.colleges.map((college) => (
                        <li key={college}>{college}</li>
                      ))}
                    </ul>
                    <h4 className="mt-2 font-medium">Students:</h4>
                    {program.students.map((student) => (
                      <p key={student.studentId}>{student.name} ({student.studentId})</p>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Chart Section */}
            <h2 className="text-xl font-semibold mt-6 mb-3">Student Distribution</h2>
            <div className="bg-white p-4 rounded-md shadow-md">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.programTotals}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalStudents" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {/* College Modal */}
      {selectedCollege && (
        <Modal onClose={() => setSelectedCollege(null)}>
          <h2 className="text-xl font-semibold">{selectedCollege.name}</h2>
          <p><strong>Place:</strong> {selectedCollege.place}</p>
          <h4 className="mt-2 font-medium">Programs:</h4>
          {selectedCollege.programs.map((program) => (
            <p key={program.uniqueCode}>{program.name} - {program.category}</p>
          ))}
        </Modal>
      )}

      {/* Program Modal */}
      {selectedProgram && (
        <Modal onClose={() => setSelectedProgram(null)}>
          <h2 className="text-xl font-semibold">{selectedProgram.name}</h2>
          <h4 className="mt-2 font-medium">Students:</h4>
          {selectedProgram.students.map((student) => (
            <p key={student.studentId}>{student.name} ({student.studentId})</p>
          ))}
        </Modal>
      )}
    </div>
  );
};

export default AdminHome;
