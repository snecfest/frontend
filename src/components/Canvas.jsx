import React from 'react';

const Canvas = ({ student }) => {
  return (
    <div className="p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-white pb-2">
        🎓 Student Details
      </h2>
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">📋 College ID:</span>
            <span className="text-gray-800">{student.collegeId}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">🆔 Student ID:</span>
            <span className="text-gray-800">{student.studentId}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">🔑 Program ID:</span>
            <span className="text-gray-800">{student.programId}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">📚 Program Name:</span>
            <span className="text-gray-800">{student.programName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
