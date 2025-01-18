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
    if (categoryName !== "General") {
      if (uniqueCode === 317 && existingStudents.length >= 2) {
        toast.error("Program 317 only allows 1 student.");
        return;
      }
      
      if (uniqueCode === 212 && existingStudents.length >= 2) {
        toast.error("Program 212 only allows 1 student.");
        return;
      }
      
      if (uniqueCode === 110 && existingStudents.length >= 3) {
        toast.error("Program 110 (കൊളാഷ് നിർമാണം) only allows 3 students.");
        return;
      }
      
      // General fallback message for other cases
      if (existingStudents.length > 1 && uniqueCode != 100 && uniqueCode != 212 && uniqueCode != 317) {
        toast.error("This category only allows the permitted number of students.");
        return;
      }
    }
    
    

    try {
      const response = await ProgramAdd({ programCode: uniqueCode, studentId });
    
      if (response.status === 200 && !response.data.error) {
        refetchPrograms(); // Refetch program data
        setStudentIds((prev) => ({ ...prev, [uniqueCode]: "" })); // Clear input for General category
      } else if (response.data.error) {
        // Handle known error responses
        const errorMessage = response.data.error;
    
        switch (errorMessage) {
          case "Student ID and Program Code are required.":
            toast.error("Please fill in both the Student ID and Program Code.");
            break;
    
          case "Program not found for your college.":
            toast.error("The specified program does not exist for your college.");
            break;
    
          case "Student not found in your college.":
            toast.error("The entered Student ID does not match any student in your college.");
            break;
    
          case "Student is already assigned to this program.":
            toast.error("This student is already assigned to the selected program.");
            break;
    
          case "Category cat1 allows only one student.":
          case "Category cat2 allows only one student.":
            toast.error("This category only allows one student per program.");
            break;
    
          default:
            toast.error(errorMessage||"An error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.log("Error in the program addition:", error);
    
      if (error.response) {
        const { status, data } = error.response;
    
        switch (status) {
          case 400:
            toast.error(data.error || "Invalid request. Please check your input.");
            break;
    
          case 404:
            toast.error(data.error || "Resource not found. Please check the details provided.");
            break;
    
          case 500:
            toast.error("Internal server error. Please try again later.");
            break;
    
          default:
            toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("Unable to connect to the server. Please check your network and try again.");
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
                  {item.categoryName === "General" || item.name === "ബ്രോഷർ മേക്കിങ്" || item.name === "കൊളാഷ് നിർമാണം" || item.students.length === 0 ? (
                    <div className="flex flex-wrap items-center">
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        value={studentIds[item.uniqueCode] || ""}
                        onChange={(e) =>
                          handleInputChange(item.uniqueCode, e.target.value)
                        }
                        onKeyPress={(e) =>
                          handleKeyPress(
                            e,
                            item.uniqueCode,
                            item.categoryName,
                            item.students.map((student) => student.studentId)
                          )
                        }
                        className="flex-1 min-w-[100px] sm:w-auto md:w-1/2 lg:w-1/3 xl:w-1/4 text-center border border-gray-300 rounded-md px-2 py-1 mr-2"
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
                  ) : null}
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
