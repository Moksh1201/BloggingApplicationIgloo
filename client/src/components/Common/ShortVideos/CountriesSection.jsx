// import React from 'react';

// const CountriesSection = () => {
//   return (
//     <div className="bg-gray-800 p-6 mt-8">
//       <h2 className="text-2xl font-bold text-white mb-4">Countries</h2>
//       {/* Here you can display country-related content */}
//       <p className="text-gray-400">Explore videos from different countries.</p>
//     </div>
//   );
// };

// export default CountriesSection;
import React from 'react';
import SectionCarousel from './SectionCarousel';

const CountriesSection = () => {
  const countries = ['Country A', 'Country B', 'Country C', 'Country D', 'Country E'];

  return (
    <div className="bg-gray-800 p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Countries</h2>
      <p className="text-gray-400 mb-4">
        Explore videos from different countries.
      </p>
      <SectionCarousel items={countries} />
    </div>
  );
};

export default CountriesSection;
