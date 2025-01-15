import React, { useState } from "react";
import { ProgramAdd } from "../services/ProgramService";
import toast from "react-hot-toast";

const Table = ({ data, onDelete, refetchPrograms }) => {
  const [studentIds, setStudentIds] = useState({});

  const handleInputChange = (uniqueCode, value) => {
    setStudentIds((prev) => ({
      ...prev,
      [uniqueCode]: value,
    }));
  };

  const handleAddStudent = async (uniqueCode, categoryName, existingStudents) => {
    const studentId = studentIds[uniqueCode];
    if (!studentId) {
      toast.error("Please enter a student ID.");
      return;
    }

    // Prevent duplicates for non-General categories
    if (categoryName !== "General" && existingStudents.includes(studentId)) {
      toast.error("This student ID is already assigned.");
      return;
    }

    try {
      const response = await ProgramAdd({ programCode: uniqueCode, studentId });
      console.log("Response in the program add", response);
      if (response.status === 200) {
        toast.success(response.data.message);
        refetchPrograms(); // Refetch program data

        // Clear the input for General category or disable for others
        setStudentIds((prev) => ({ ...prev, [uniqueCode]: "" }));
      }
    } catch (error) {
      console.log("Error in the program addition", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Student Not Found In Your College");
      }
    }
  };

  const handleKeyPress = (e, uniqueCode, categoryName, existingStudents) => {
    if (e.key === "Enter") {
      handleAddStudent(uniqueCode, categoryName, existingStudents);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Program Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Program Code</th>
              <th className="border border-gray-300 px-4 py-2">Program Name</th>
              <th className="border border-gray-300 px-4 py-2">Program Category</th>
              <th className="border border-gray-300 px-4 py-2">Student ID</th>
              <th className="border border-gray-300 px-4 py-2">Student Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.uniqueCode}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.categoryName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="space-y-2">
                    {/* Existing student IDs */}
                    {item.students.map((student, idx) => (
                      <input
                        key={`${student.studentId}-${idx}`}
                        type="text"
                        value={student.studentId}
                        disabled
                        className="w-full text-center bg-gray-100 border border-gray-300 rounded-md px-2 py-1"
                      />
                    ))}
                    {/* Input for new student ID */}
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        value={studentIds[item.uniqueCode] || ""}
                        onChange={(e) => handleInputChange(item.uniqueCode, e.target.value)}
                        onKeyPress={(e) =>
                          handleKeyPress(
                            e,
                            item.uniqueCode,
                            item.categoryName,
                            item.students.map((student) => student.studentId)
                          )
                        }
                        className="w-full text-center border border-gray-300 rounded-md px-2 py-1 mr-2"
                      />
                      <button
                        onClick={() =>
                          handleAddStudent(
                            item.uniqueCode,
                            item.categoryName,
                            item.students.map((student) => student.studentId)
                          )
                        }
                        className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.students.map((student) => student.name).join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => onDelete(item)}
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
