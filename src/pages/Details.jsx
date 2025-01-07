import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import NewItemForm from "../components/NewItemForm";
import Table from "../components/Table";
import Canvas from "../components/Canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ProgramGet,DeleteProgram } from "../services/ProgramService";
import toast from "react-hot-toast";

const Details = () => {
  const [viewCard, setViewCard] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [programData,setProgramData]=useState([])
  
  const programsFetching=async()=>{
    try {
      const response=await ProgramGet()
      console.log('fetched programs in the component',response)
      setProgramData(response.programs)
    } catch (error) {
      console.log('error in the progaram fetch function in the component',error)
    }
  }
  useEffect(()=>{
    programsFetching()
  },[])

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

  const handleDelete=async(item)=>{
    console.log('clicking the delete button',item)
    try {
      const response=await DeleteProgram(item.uniqueCode)
      if(response.status===200){
        toast.success(response.data.message)
        programsFetching()
      }
      return
    } catch (error) {
      console.log('delete error in component',error)
      toast.error(error.response.data.message)
    }

  }
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
          data={programData}
          onView={handleView}
          onDelete={handleDelete}
          onDownload={handleDownload}
          refetchPrograms={programsFetching}
        />
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <NewItemForm onClose={handleCloseModal}/>
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
