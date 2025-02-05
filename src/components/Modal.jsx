import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"></div>
      
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full z-50 overflow-hidden relative">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;