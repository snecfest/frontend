import React, { useState } from "react";
import Modal from "../components/Modal";
import NewItemForm from "../components/NewItemForm";
import Table from "../components/Table";
import Canvas from "../components/Canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Details = () => {
  const [viewCard, setViewCard] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const mockData = [
    {
      collegeId: "COL001",
      studentId: "STU001",
      programId: "PROG001",
      programName: "Computer Science",
    },
    {
      collegeId: "COL002",
      studentId: "STU002",
      programId: "PROG002",
      programName: "Mechanical Engineering",
    },
    {
      collegeId: "COL003",
      studentId: "STU003",
      programId: "PROG003",
      programName: "Electrical Engineering",
    },
  ];

  const handleAddNew = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setViewCard(false);
  };

  const handleView = (item) => {
    setViewCard(true);
    setSelectedStudent(item);
  };

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
  
        // Generate the image and PDF
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
    <div className="p-6">
      <div className="flex justify-end">
        <button
          className="bg-green-600 text-white hover:bg-green-900 w-28 rounded-lg h-8"
          onClick={handleAddNew}
        >
          Add New +
        </button>
      </div>
      <div>
        <Table
          data={mockData}
          onView={handleView}
          onDelete={(item) => console.log("Deleting item:", item)}
          onDownload={handleDownload}
        />
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <NewItemForm />
      </Modal>
      <Modal isOpen={viewCard} onClose={handleCloseModal}>
        <div
          id="canvas-to-download"
          // style={{ padding: "20px", backgroundColor: "white" }} // Add default styling
        >
          <Canvas student={selectedStudent} />
        </div>
      </Modal>
    </div>
  );
};

export default Details;
