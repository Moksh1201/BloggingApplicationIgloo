// import React from 'react';

// const CategoryFilter = ({ categories, setCategory, category }) => {
//   return (
//     <div className="overflow-hidden relative py-4">
//       <div className="flex gap-4">
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             className={`px-6 py-3 text-center text-lg font-semibold cursor-pointer rounded-lg transition-transform duration-300 bg-gray-800 text-white shadow-md ${category === cat ? 'bg-blue-500' : ''}`}
//             onClick={() => setCategory(cat)}
//           >
//             {cat}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryFilter;
import React from 'react';

const CategoryFilter = ({ setCategory, category }) => {
  const categories = [
    'All',
    'Comedy',
    'Entertainment',
    'Education',
    'Sports',
    'Travel',
    'Blog',
    'Information',
    'Anime',
    'Study',
  ];

  return (
    <div className="overflow-hidden relative py-4">
      <div className="flex gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`px-6 py-3 text-center text-lg font-semibold cursor-pointer rounded-lg transition-transform duration-300 bg-gray-800 text-white shadow-md ${
              category === cat ? 'bg-blue-500' : ''
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
