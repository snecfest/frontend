import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full z-50">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold"></h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none font-bold"
            >
              &times;
            </button>
          </div>
          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
