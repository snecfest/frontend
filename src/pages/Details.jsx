import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import NewItemForm from "../components/NewItemForm";
import Table from "../components/Table";
import Canvas from "../components/Canvas";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ProgramGet,DeleteProgram, FetchProgramByStudentId } from "../services/ProgramService";
import toast from "react-hot-toast";
import Search from "../components/Search";

const Details = () => {
  const [viewCard, setViewCard] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [programData,setProgramData]=useState([])
  const [viewModal,setViewModal]=useState(false)
  const [fetchedStudentData,setFetchedStudentData]=useState([])

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

  

  const handleCloseModal = () => {
    setViewCard(false);
    setViewModal(false)
  };

  // search option function

  const handleView=async(value)=>{
    try {
      const studentIds = value.split(',').map((id) => id.trim());
    if (studentIds.length === 0) {
      console.log('No student IDs provided');
      return;
    }
    const response = await FetchProgramByStudentId(studentIds);
    console.log('Fetched programs:', response);
    if(response.status===200){
      setFetchedStudentData(response.data.students)
      setViewModal(true)
    }
    } catch (error) {
      console.log('error for the fetching program by studentIds in component',error)
    }
  }

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
      <div className="w-full mb-4">
        <Search   onView={handleView}/>
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
      <Modal isOpen={viewModal} onClose={handleCloseModal}>
        <div className="space-y-4">
          {fetchedStudentData.map((student, index) => (
            <Canvas key={index} student={student} />
          ))}
        </div>
      </Modal>
      {/* <Modal isOpen={viewCard} onClose={handleCloseModal}>
        <div
          id="canvas-to-download"
        >
          <Canvas student={selectedStudent} />
        </div>
      </Modal> */}
    </div>
  );
};

export default Details;
