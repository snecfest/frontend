import React,{useState} from 'react';
import { DeleteProgram } from '../services/ProgramService';

const Table = ({ data, onView, onDelete, onDownload }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);



  const handleView = (item) => {
    setViewCard(true);
    setSelectedStudent(item);
  };

  const handleDelete=async(item)=>{
    console.log('clicking the delete button',item)
    try {
      const response=await DeleteProgram(item.uniqueCode)
      console.log('delete response in component ')
    } catch (error) {
      console.log('delete error in component',error)
    }

  }
  const handleDownload = async (item) => {
    setSelectedStudent(item);
    setViewCard(true); // Open the modal
  
    // Wait for modal rendering before capturing the canvas
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
                <td className="border border-gray-300 px-4 py-2 text-center">{item.uniqueCode}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.categoryName}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.students.map((student) => student.studentId).join(', ')}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.students.map((student) => student.name).join(', ')}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleView(item)}
                    className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleDownload(item)}
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
