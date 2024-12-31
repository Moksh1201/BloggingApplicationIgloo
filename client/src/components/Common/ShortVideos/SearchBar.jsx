import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="py-4 container mx-auto px-6">
      <input
        type="text"
        placeholder="Search by title or tag..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-700 text-white"
      />
    </div>
  );
};

export default SearchBar;
