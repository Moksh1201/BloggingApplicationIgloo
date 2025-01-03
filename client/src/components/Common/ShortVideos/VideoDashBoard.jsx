// import React, { useState } from 'react';
// import CategoryFilter from './CategoryFilter';
// import VideoCarousel from './VideoCarousel';
// import CountriesSection from './CountriesSection';
// import CultureSection from './CultureSection';
// import PopularPeopleSection from './PopularPeopleSection';
// import SearchBar from './SearchBar';

// const VideoDashboard = () => {
//   const [category, setCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');

//   const videos = [
//     { id: 1, title: 'Funny Video', category: 'Comedy', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 2, title: 'Movie Clip', category: 'Entertainment', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 3, title: 'Tutorial', category: 'Education', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 4, title: 'Football Highlights', category: 'Sports', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 5, title: 'Travel Vlog', category: 'Travel', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 6, title: 'Daily Blog', category: 'Blog', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 7, title: 'Information Video', category: 'Information', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 8, title: 'Anime Clip', category: 'Anime', thumbnail: 'https://via.placeholder.com/200' },
//     { id: 9, title: 'Study Tips', category: 'Study', thumbnail: 'https://via.placeholder.com/200' },
//   ];

//   const filteredVideos =
//     category === 'All' ? videos : videos.filter((video) => video.category === category);

//   const searchFilteredVideos = filteredVideos.filter((video) =>
//     video.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <header className="bg-gray-800 py-4 shadow-lg sticky top-0 z-10">
//         <div className="container mx-auto flex justify-between items-center px-6">
//           <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide shadow-lg">Vibes</h1>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
//             Add Video
//           </button>
//         </div>
//       </header>

//       <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

//       <CategoryFilter setCategory={setCategory} category={category} />

//       {/* Video Carousel */}
//       <VideoCarousel filteredVideos={searchFilteredVideos} category={category} />

//       <div className="mt-8">
//         <CountriesSection />
//         <CultureSection />
//         <PopularPeopleSection />
//       </div>
//     </div>
//   );
// };

// export default VideoDashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from './CategoryFilter';
import VideoCarousel from './VideoCarousel';
import CountriesSection from './CountriesSection';
import CultureSection from './CultureSection';
import PopularPeopleSection from './PopularPeopleSection';
import SearchBar from './SearchBar';

const VideoDashboard = () => {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([
    { id: 1, title: 'Funny Video', category: 'Comedy', thumbnail: 'https://via.placeholder.com/200' },
    { id: 2, title: 'Movie Clip', category: 'Entertainment', thumbnail: 'https://via.placeholder.com/200' },
    { id: 3, title: 'Tutorial', category: 'Education', thumbnail: 'https://via.placeholder.com/200' },
    { id: 4, title: 'Football Highlights', category: 'Sports', thumbnail: 'https://via.placeholder.com/200' },
    { id: 5, title: 'Travel Vlog', category: 'Travel', thumbnail: 'https://via.placeholder.com/200' },
    { id: 6, title: 'Daily Blog', category: 'Blog', thumbnail: 'https://via.placeholder.com/200' },
    { id: 7, title: 'Information Video', category: 'Information', thumbnail: 'https://via.placeholder.com/200' },
    { id: 8, title: 'Anime Clip', category: 'Anime', thumbnail: 'https://via.placeholder.com/200' },
    { id: 9, title: 'Study Tips', category: 'Study', thumbnail: 'https://via.placeholder.com/200' },
  ]);

  const navigate = useNavigate();

  const filteredVideos =
    category === 'All' ? videos : videos.filter((video) => video.category === category);

  const searchFilteredVideos = filteredVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddVideo = (newVideo) => {
    setVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide shadow-lg">Vibes</h1>
          <button
            onClick={() => navigate('/upload-video')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Add Video
          </button>
        </div>
      </header>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryFilter setCategory={setCategory} category={category} />

      {/* Video Carousel */}
      <VideoCarousel filteredVideos={searchFilteredVideos} category={category} />

      <div className="mt-8">
        <CountriesSection />
        <CultureSection />
        <PopularPeopleSection />
      </div>
    </div>
  );
};

export default VideoDashboard;
