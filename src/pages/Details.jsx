import React, { useState } from 'react';
import Modal from '../components/Modal'; // Import the Modal component
import NewItemForm from '../components/NewItemForm';
import Table from '../components/Table';

const Details = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleAddNew = () => {
    console.log('Clicking the new button');
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };
  const mockData = [
    {
      collegeId: 'COL001',
      studentId: 'STU001',
      programId: 'PROG001',
      programName: 'Computer Science',
    },
    {
      collegeId: 'COL002',
      studentId: 'STU002',
      programId: 'PROG002',
      programName: 'Mechanical Engineering',
    },
    {
      collegeId: 'COL003',
      studentId: 'STU003',
      programId: 'PROG003',
      programName: 'Electrical Engineering',
    },
  ];
  const handleView = (item) => {
    console.log('Viewing item:', item);
  };

  const handleDelete = (item) => {
    console.log('Deleting item:', item);
  };

  const handleDownload = (item) => {
    console.log('Downloading item:', item);
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
            onDelete={handleDelete}
            onDownload={handleDownload}
        />
        </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <NewItemForm />
        
      </Modal>
    </div>
  );
};

export default Details;
