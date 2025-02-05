import React, { useState, useEffect } from "react";
import { fetchAdminData } from "../../services/AdminService";
import Modal from "../../components/Modal";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminHome = () => {
  const [token, setToken] = useState("");
  const [submittedToken, setSubmittedToken] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    if (submittedToken) {
      fetchAdminData(submittedToken).then((response) => {
        if (response.status === 200) {
          setAdminData(response.data);
        }
      });
    }
  }, [submittedToken]);

  const handleSubmit = async () => {
    if (!token.trim()) {
      alert("Please enter a token!");
      return;
    }
    setSubmittedToken(token);
    setToken("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
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

      {/* College Data */}
      {adminData && (
        <div className="p-6">
          <h2 className="text-2xl font-bold">Colleges & Programs</h2>
          <div className="grid grid-cols-2 gap-4">
            {adminData.data.colleges.map((college) => (
              <div key={college._id} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-bold">{college.name}</h3>
                <button
                  onClick={() => setSelectedCollege(college)}
                  className="text-blue-500 mt-2"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Program Data */}
      {adminData && (
        <div className="p-6">
          <h2 className="text-2xl font-bold">Programs Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            {adminData.data.programTotals.map((program) => (
              <div key={program.name} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-bold">{program.name}</h3>
                <p>{program.totalStudents} Students</p>
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="text-blue-500 mt-2"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* College Modal */}
      {selectedCollege && (
        <Modal title={selectedCollege.name} onClose={() => setSelectedCollege(null)}>
          {selectedCollege.programs.map((program) => (
            <div key={program.uniqueCode} className="mt-4">
              <h3 className="text-lg font-semibold">{program.name}</h3>
              <button className="text-blue-500" onClick={() => program.showStudents = !program.showStudents}>
                Toggle Students
              </button>
              {program.showStudents && (
                <ul className="ml-4 mt-2">
                  {program.students.map((student) => (
                    <li key={student.studentId} className="text-gray-700">
                      {student.studentId} - {student.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Modal>
      )}

      {/* Program Modal */}
      {selectedProgram && (
        <Modal title={selectedProgram.name} onClose={() => setSelectedProgram(null)}>
          <h3 className="text-lg font-semibold">Total Students: {selectedProgram.totalStudents}</h3>
          <h4 className="mt-2">Colleges Offering:</h4>
          <ul>
            {selectedProgram.colleges.map((college) => (
              <li key={college} className="text-gray-700">{college}</li>
            ))}
          </ul>
        </Modal>
      )}

      {/* Charts */}
      {adminData && (
        <div className="p-6">
          <h2 className="text-2xl font-bold">Student Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adminData.data.programTotals}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalStudents" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AdminHome;