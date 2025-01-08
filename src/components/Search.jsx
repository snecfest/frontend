import React,{useState} from "react";
const Search = ({  onView, onGenerate }) => {
    const [searchValue, setSearchValue] = useState("");
  
    const handleSearch = (searchValue) => {
        onView(searchValue);
    };
  
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter Student Id..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full sm:flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
  
        {/* Buttons */}
        <div className="flex space-x-2">
          {/* View Button */}
          <button
            onClick={() => handleSearch(searchValue)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            View
          </button>
  
          
          <button
            onClick={() => onGenerate && onGenerate(searchValue)}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Generate
          </button>
        </div>
      </div>
    );
  };
  

  export default Search