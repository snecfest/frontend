import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import NewItemForm from "../components/NewItemForm";
import Canvas from "../components/Canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ProgramGet, DeleteProgram, FetchProgramByStudentId } from "../services/ProgramService";
import toast from "react-hot-toast";
import Search from "../components/Search";

const Details = () => {
  const [viewCard, setViewCard] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [programData, setProgramData] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [fetchedStudentData, setFetchedStudentData] = useState([]);

  const programsFetching = async () => {
    try {
      const response = await ProgramGet();
      console.log("Fetched programs in the component", response);
      setProgramData(response.programs);
    } catch (error) {
      console.log("Error in the program fetch function in the component", error);
    }
  };

  useEffect(() => {
    programsFetching();
  }, []);

  const handleCloseModal = () => {
    setViewCard(false);
    setViewModal(false);
  };

  const handleView = async (value) => {
    try {
      const studentIds = value.split(",").map((id) => id.trim());
      if (studentIds.length === 0) {
        console.log("No student IDs provided");
        return;
      }
      const response = await FetchProgramByStudentId(studentIds);
      console.log("Fetched programs:", response);
      if (response.status === 200) {
        setFetchedStudentData(response.data.students);
        setViewModal(true);
      }
    } catch (error) {
      console.log("Error fetching program by student IDs in component", error);
    }
  };

  const handleDelete = async (item) => {
    console.log("Clicking the delete button", item);
    try {
      const response = await DeleteProgram(item.uniqueCode);
      if (response.status === 200) {
        toast.success(response.data.message);
        programsFetching();
      }
      return;
    } catch (error) {
      console.log("Delete error in component", error);
      toast.error(error.response.data.message);
    }
  };

  const handleDownload = async (item) => {
    setSelectedStudent(item);
    setViewCard(true); // Open the modal

    setTimeout(async () => {
      const canvasElement = document.getElementById("canvas-to-download");
      if (!canvasElement) {
        console.error("Canvas element not found");
        return;
      }

      try {
        // Capture the canvas content
        const canvas = await html2canvas(canvasElement, {
          useCORS: true,
          scale: 2,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${item.studentId}_details.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }

      setViewCard(false); // Close modal after download
    }, 500); // Adjust delay as needed for rendering
  };

  // Group programs by category and sort
  const groupedPrograms = programData.reduce((acc, program) => {
    const category = program.categoryName;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(program);
    return acc;
  }, {});

  Object.keys(groupedPrograms).forEach((category) => {
    groupedPrograms[category].sort((a, b) => a.uniqueCode.localeCompare(b.uniqueCode));
  });

  return (
    <div className="p-6">
      <div className="w-full mb-4">
        <Search onView={handleView} />
      </div>
      <div>
        {Object.keys(groupedPrograms).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Program Code</th>
                    <th className="border border-gray-300 px-4 py-2">Program Name</th>
                    <th className="border border-gray-300 px-4 py-2">Eligible Colleges</th>
                    <th className="border border-gray-300 px-4 py-2">Student Name</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedPrograms[category].map((program) => (
                    <tr key={program._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {program.uniqueCode}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {program.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {program.eligibleColleges.join(", ")}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {program.students.length > 0
                          ? program.students.map((student) => student.name).join(", ")
                          : "No students"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(program)}
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
        ))}
      </div>
      <Modal isOpen={viewModal} onClose={handleCloseModal}>
        <div className="space-y-4">
          {fetchedStudentData.map((student, index) => (
            <Canvas key={index} student={student} />
          ))}
        </div>
      </Modal>
      <Modal isOpen={viewCard} onClose={handleCloseModal}>
        <div id="canvas-to-download">
          <Canvas student={selectedStudent} />
        </div>
      </Modal>
    </div>
  );
};

export default Details;
