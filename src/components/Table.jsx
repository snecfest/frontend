import React from 'react';

const Table = ({ data, onView, onDelete, onDownload }) => {
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
              <th className="border border-gray-300 px-4 py-2">Students</th>
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
                  {item.students.map((student) => student.name).join(', ')}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => onView(item)}
                    className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onDownload(item)}
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
