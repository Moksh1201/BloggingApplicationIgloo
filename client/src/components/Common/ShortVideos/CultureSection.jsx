import React from 'react';
import SectionCarousel from './SectionCarousel';

const CultureSection = () => {
  const cultures = ['Culture A', 'Culture B', 'Culture C', 'Culture D', 'Culture E'];

  return (
    <div className="bg-gray-800 p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Culture</h2>
      <p className="text-gray-400 mb-4">
        Discover videos that explore various cultures around the world.
      </p>
      <SectionCarousel items={cultures} />
    </div>
  );
};

export default CultureSection;
