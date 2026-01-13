import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row bg-white/10 rounded-lg p-1 w-full"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name..."
        className="px-4 py-2 bg-transparent outline-none text-white w-full placeholder-gray-300"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold w-full sm:w-auto mt-2 sm:mt-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
