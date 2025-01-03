import React from 'react';
import SectionCarousel from './SectionCarousel';

const PopularPeopleSection = () => {
  const popularPeople = ['Creator A', 'Creator B', 'Creator C', 'Creator D', 'Creator E'];

  return (
    <div className="bg-gray-800 p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Popular People</h2>
      <p className="text-gray-400 mb-4">
        Find videos from creators with large followings.
      </p>
      <SectionCarousel items={popularPeople} />
    </div>
  );
};

export default PopularPeopleSection;
