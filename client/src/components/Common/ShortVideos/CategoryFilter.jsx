// CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, setCategory }) => {
  return (
    <div className="bg-gray-700 py-4">
      <div className="container mx-auto flex gap-4 overflow-x-auto px-4">
        <button
          onClick={() => setCategory('All')}
          className="bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded text-white"
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCategory(category)}
            className="bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
