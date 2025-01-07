import React, { useState } from "react";
import { ProgramAdd } from "../services/ProgramService";
import toast from "react-hot-toast";

const Table = ({ data, onView, onDelete, onDownload,refetchPrograms }) => {
  const [studentIds, setStudentIds] = useState({});

  const handleInputChange = async (uniqueCode, value) => {
    setStudentIds((prev) => ({
      ...prev,
      [uniqueCode]: value,
    }));
  
    
  
    if (value.length > 5) {
      toast.error("Student ID cannot exceed 5 characters");
      return;
    }
  
    if (value.length === 5) {
      try {
        const response = await ProgramAdd({ programCode: uniqueCode, studentId: value });
        console.log("response in the program add", response);
        if (response.status === 200) {
          toast.success(response.data.message);
          refetchPrograms(); // Call to refetch program data
        }
      } catch (error) {
        console.log("error in the program addition", error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message); 
        } else {
          toast.error("An unexpected error occurred. Please try again."); 
        }
      }
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
              <th className="border border-gray-300 px-4 py-2">Student Id</th>
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
                <td className="border border-gray-300 ">
                  {item.students.length > 0 ? (
                    item.students.map((student,index) => (
                      <>
                      
                      <input
                        key={student.studentId}
                        type="text"
                        value={student.studentId}
                        disabled
                        className="w-2/4 text-center bg-gray-100 border border-gray-300 rounded-md px-2 py-1"
                      />
                      </>
                      
                    ))
                  ) : (
                    <>
                    <div className="flex">

                    <input
                      type="text"
                      placeholder="Enter Student ID"
                      value={studentIds[item.uniqueCode] || ""}
                      onChange={(e) =>
                        handleInputChange(item.uniqueCode, e.target.value)
                      }
                      className="w-2/4 text-center border border-gray-300 rounded-md px-2 py-1"
                    />
                    </div>

                    </>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.students.map((student) => student.name).join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => onView(item)}
                    className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onDownload(item)}
                    className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700"
                  >
                    Download
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
