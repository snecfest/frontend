import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
      
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full z-50 overflow-hidden">
        <div className="pl-4 text-black flex justify-end items-center">
          <button
            onClick={onClose}
            className="text-black  focus:outline-none font-bold text-2xl"
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
