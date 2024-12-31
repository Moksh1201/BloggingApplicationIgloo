// import React, { useState, useRef, useEffect } from 'react';

// const VideoDashboard = () => {
//   const [category, setCategory] = useState('All');
//   const carouselRef = useRef(null);

//   const categories = ['All', 'Comedy', 'Entertainment', 'Education', 'Sports', 'Travel', 'Blog', 'Information', 'Anime', 'Study'];
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

//   const filteredVideos = category === 'All' ? videos : videos.filter(video => video.category === category);

//   // Function to handle pausing/resuming the scroll animation based on the category filter
//   useEffect(() => {
//     const carousel = carouselRef.current;

//     const handleMouseEnter = () => {
//       carousel.style.animationPlayState = 'paused'; // Pause the animation when hovered
//     };

//     const handleMouseLeave = () => {
//       carousel.style.animationPlayState = 'running'; // Resume the animation when hover ends
//     };

//     // Pause the animation when a filter is applied (except 'All')
//     if (category !== 'All') {
//       carousel.style.animationPlayState = 'paused';
//     } else {
//       carousel.style.animationPlayState = 'running';
//     }

//     // Add event listeners to handle hover events
//     carousel.addEventListener('mouseenter', handleMouseEnter);
//     carousel.addEventListener('mouseleave', handleMouseLeave);

//     // Cleanup event listeners on component unmount
//     return () => {
//       carousel.removeEventListener('mouseenter', handleMouseEnter);
//       carousel.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [category]); // This will run every time the category filter changes

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <header className="bg-gray-800 py-4 shadow-lg sticky top-0 z-10">
//         <div className="container mx-auto flex justify-start items-center px-6">
//           <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide shadow-lg">
//             Vibes
//           </h1>
//         </div>
//       </header>

//       {/* Categories Carousel */}
//       <div className="overflow-hidden relative py-4">
//         <div
//           className="flex gap-4"
//           style={{
//             display: 'flex',
//             overflowX: 'hidden',
//             whiteSpace: 'nowrap',
//           }}
//         >
//           {categories.map((cat, index) => (
//             <div
//               key={index}
//               className={`px-6 py-3 text-center text-lg font-semibold cursor-pointer rounded-lg transition-transform duration-300 bg-gray-800 text-white shadow-md ${
//                 category === cat ? 'bg-blue-500' : ''
//               }`}
//               onClick={() => setCategory(cat)}
//             >
//               {cat}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Video Carousel */}
//       <div className="overflow-hidden relative py-8">
//         <div
//           ref={carouselRef}
//           className="flex gap-4"
//           style={{
//             display: 'flex',
//             overflowX: 'hidden',
//             whiteSpace: 'nowrap',
//             scrollBehavior: 'smooth',
//             animation: category === 'All' ? 'scroll-left 50s linear infinite' : 'none', // Apply animation only when 'All' is selected
//             width: `${Math.max(filteredVideos.length * 350, 1000)}px`, // Make sure width adjusts based on the number of videos and is at least 1000px
//           }}
//         >
//           {filteredVideos.concat(filteredVideos).map((video, index) => (
//             <div
//               key={index}
//               className="min-w-[350px] bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-110 hover:mx-2 hover:shadow-xl"
//             >
//               <img
//                 src={video.thumbnail}
//                 alt={video.title}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">{video.title}</h3>
//                 <p className="text-sm text-gray-400">Category: {video.category}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add a keyframe for smooth scrolling */}
//       <style>
//         {`
//           @keyframes scroll-left {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(-100%);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default VideoDashboard;
// import React, { useState, useRef, useEffect } from 'react';
// import CategoryFilter from './CategoryFilter';
// import VideoCarousel from './VideoCarousel';

// const VideoDashboard = () => {
//   const [category, setCategory] = useState('All');
//   const carouselRef = useRef(null);

//   const categories = ['All', 'Comedy', 'Entertainment', 'Education', 'Sports', 'Travel', 'Blog', 'Information', 'Anime', 'Study'];
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

//   const filteredVideos = category === 'All' ? videos : videos.filter(video => video.category === category);

//   useEffect(() => {
//     const carousel = carouselRef.current;

//     const handleMouseEnter = () => {
//       if (category === 'All') {
//         carousel.style.animationPlayState = 'paused'; // Pause when hovered
//       }
//     };

//     const handleMouseLeave = () => {
//       if (category === 'All') {
//         carousel.style.animationPlayState = 'running'; // Resume when hover ends
//       }
//     };

//     // If the category is not 'All', ensure no animation is running
//     if (category !== 'All') {
//       carousel.style.animationPlayState = 'paused';
//     } else {
//       carousel.style.animationPlayState = 'running';
//     }

//     // Add event listeners to handle hover events
//     carousel.addEventListener('mouseenter', handleMouseEnter);
//     carousel.addEventListener('mouseleave', handleMouseLeave);

//     // Cleanup event listeners on component unmount
//     return () => {
//       carousel.removeEventListener('mouseenter', handleMouseEnter);
//       carousel.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [category]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <header className="bg-gray-800 py-4 shadow-lg sticky top-0 z-10">
//         <div className="container mx-auto flex justify-start items-center px-6">
//           <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide shadow-lg">
//             Vibes
//           </h1>
//         </div>
//       </header>

//       {/* Category Filter */}
//       <CategoryFilter categories={categories} setCategory={setCategory} category={category} />

//       {/* Video Carousel */}
//       <VideoCarousel filteredVideos={filteredVideos} carouselRef={carouselRef} category={category} />
//     </div>
//   );
// };

// export default VideoDashboard;
// import React, { useState, useRef, useEffect } from 'react';
// import CategoryFilter from './CategoryFilter';
// import VideoCarousel from './VideoCarousel';
// import CountriesSection from './CountriesSection'; // New section for countries
// import CultureSection from './CultureSection'; // New section for culture
// import PopularPeopleSection from './PopularPeopleSection'; // New section for popular people
// import SearchBar from './SearchBar'; // Search bar component for title and tag filtering

// const VideoDashboard = () => {
//   const [category, setCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const carouselRef = useRef(null);

//   const categories = ['All', 'Comedy', 'Entertainment', 'Education', 'Sports', 'Travel', 'Blog', 'Information', 'Anime', 'Study'];
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

//   const filteredVideos = category === 'All' ? videos : videos.filter(video => video.category === category);
  
//   // Filter videos by search query (by title or tag)
//   const searchFilteredVideos = filteredVideos.filter(video => 
//     video.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     const carousel = carouselRef.current;

//     // Function to pause or resume animation based on search query or category
//     const handleCarouselAnimation = () => {
//       if (searchQuery || category !== 'All') {
//         carousel.style.animationPlayState = 'paused'; // Pause the carousel if search query or category is applied
//         carousel.style.overflowX = 'scroll'; // Ensure the overflow behavior is scrollable when paused
//         carousel.style.width = `${searchFilteredVideos.length * 350}px`; // Dynamically adjust the width based on the number of videos
//       } else {
//         carousel.style.animationPlayState = 'running'; // Resume when no search query or category filter is active
//         carousel.style.overflowX = 'hidden'; // Hide the overflow when animation is running
//         carousel.style.width = '100%'; // Reset the width back to full width when animation is active
//       }
//     };

//     // Initial check when the component mounts or when searchQuery/category changes
//     handleCarouselAnimation();

//     // Add event listeners to handle hover events
//     const handleMouseEnter = () => {
//       if (category === 'All' && !searchQuery) {
//         carousel.style.animationPlayState = 'paused'; // Pause when hovered
//       }
//     };

//     const handleMouseLeave = () => {
//       if (category === 'All' && !searchQuery) {
//         carousel.style.animationPlayState = 'running'; // Resume when hover ends
//       }
//     };

//     // Add event listeners
//     carousel.addEventListener('mouseenter', handleMouseEnter);
//     carousel.addEventListener('mouseleave', handleMouseLeave);

//     // Cleanup event listeners on component unmount
//     return () => {
//       carousel.removeEventListener('mouseenter', handleMouseEnter);
//       carousel.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [searchQuery, category, searchFilteredVideos]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <header className="bg-gray-800 py-4 shadow-lg sticky top-0 z-10">
//         <div className="container mx-auto flex justify-between items-center px-6">
//           <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide shadow-lg">Vibes</h1>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
//             Add Video
//           </button>
//         </div>
//       </header>

//       {/* Search Bar */}
//       <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

//       {/* Category Filter */}
//       <div className="overflow-hidden relative py-4">
//         <CategoryFilter categories={categories} setCategory={setCategory} category={category} />
//       </div>

//       {/* Video Carousel */}
//       <VideoCarousel filteredVideos={searchFilteredVideos} carouselRef={carouselRef} category={category} />

//       {/* New Sections below the video carousel */}
//       <div className="mt-8">
//         <CountriesSection />
//         <CultureSection />
//         <PopularPeopleSection />
//       </div>

//       {/* Add a keyframe for smooth scrolling */}
//       <style>
//         {`
//           @keyframes scroll-left {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(-100%);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default VideoDashboard;
// import React, { useState, useRef, useEffect } from 'react';
// import CategoryFilter from './CategoryFilter';
// import VideoCarousel from './VideoCarousel';
// import CountriesSection from './CountriesSection'; // New section for countries
// import CultureSection from './CultureSection'; // New section for culture
// import PopularPeopleSection from './PopularPeopleSection'; // New section for popular people
// import SearchBar from './SearchBar'; // Search bar component for title and tag filtering

// const VideoDashboard = () => {
//   const [category, setCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const carouselRef = useRef(null);

//   const categories = ['All', 'Comedy', 'Entertainment', 'Education', 'Sports', 'Travel', 'Blog', 'Information', 'Anime', 'Study'];
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

//   const filteredVideos = category === 'All' ? videos : videos.filter(video => video.category === category);
  
//   // Filter videos by search query (by title or tag)
//   const searchFilteredVideos = filteredVideos.filter(video => 
//     video.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     const carousel = carouselRef.current;

//     // Function to pause or resume animation based on search query or category
//     const handleCarouselAnimation = () => {
//       if (searchQuery || category !== 'All') {
//         carousel.style.animationPlayState = 'paused'; // Pause the carousel if search query or category is applied
//         carousel.style.overflowX = 'auto'; // Ensure the overflow behavior is scrollable when paused
//         carousel.style.width = `${searchFilteredVideos.length * 350}px`; // Dynamically adjust the width based on the number of videos
//       } else {
//         carousel.style.animationPlayState = 'running'; // Resume when no search query or category filter is active
//         carousel.style.overflowX = 'hidden'; // Hide the overflow when animation is running
//         carousel.style.width = '100%'; // Reset the width back to full width when animation is active
//       }
//     };

//     // Initial check when the component mounts or when searchQuery/category changes
//     handleCarouselAnimation();

//     // Add event listeners to handle hover events
//     const handleMouseEnter = () => {
//       if (category === 'All' && !searchQuery) {
//         carousel.style.animationPlayState = 'paused'; // Pause when hovered
//       }
//     };

//     const handleMouseLeave = () => {
//       if (category === 'All' && !searchQuery) {
//         carousel.style.animationPlayState = 'running'; // Resume when hover ends
//       }
//     };

//     // Add event listeners
//     carousel.addEventListener('mouseenter', handleMouseEnter);
//     carousel.addEventListener('mouseleave', handleMouseLeave);

//     // Cleanup event listeners on component unmount
//     return () => {
//       carousel.removeEventListener('mouseenter', handleMouseEnter);
//       carousel.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [searchQuery, category, searchFilteredVideos]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <header className="bg-gray-800 py-4 shadow-lg sticky top-0 z-10">
//         <div className="container mx-auto flex justify-between items-center px-6">
//           <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide shadow-lg">Vibes</h1>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
//             Add Video
//           </button>
//         </div>
//       </header>

//       {/* Search Bar */}
//       <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

//       {/* Category Filter */}
//       <div className="overflow-hidden relative py-4">
//         <CategoryFilter categories={categories} setCategory={setCategory} category={category} />
//       </div>

//       {/* Video Carousel */}
//       <div className="relative">
//         <div
//           className="flex gap-4 transition-all"
//           ref={carouselRef}
//           style={{
//             overflowX: 'auto',
//             width: '100%',
//             padding: '10px 0',
//             animation: !searchQuery && category === 'All' ? 'scroll-left 20s linear infinite' : 'none',
//             display: 'flex',
//           }}
//         >
//           {searchFilteredVideos.map((video) => (
//             <div key={video.id} className="flex-shrink-0 w-48 bg-gray-800 rounded-lg shadow-lg">
//               <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover rounded-t-lg" />
//               <div className="p-4">
//                 <h3 className="text-white font-semibold">{video.title}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* New Sections below the video carousel */}
//       <div className="mt-8">
//         <CountriesSection />
//         <CultureSection />
//         <PopularPeopleSection />
//       </div>

//       {/* Add a keyframe for smooth scrolling */}
//       <style>
//         {`
//           @keyframes scroll-left {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(-100%);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default VideoDashboard;
// import React, { useState, useRef, useEffect } from 'react';
// import CategoryFilter from './CategoryFilter';
// import VideoCarousel from './VideoCarousel';
// import CountriesSection from './CountriesSection';
// import CultureSection from './CultureSection';
// import PopularPeopleSection from './PopularPeopleSection';
// import SearchBar from './SearchBar';

// const VideoDashboard = () => {
//   const [category, setCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const carouselRef = useRef(null);

//   const categories = ['All', 'Comedy', 'Entertainment', 'Education', 'Sports', 'Travel', 'Blog', 'Information', 'Anime', 'Study'];
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

//   const filteredVideos = category === 'All' ? videos : videos.filter(video => video.category === category);

//   const searchFilteredVideos = filteredVideos.filter(video => 
//     video.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     const carousel = carouselRef.current;

//     const handleCarouselAnimation = () => {
//       if (searchQuery || category !== 'All') {
//         carousel.style.animationPlayState = 'paused';
//         carousel.style.overflowX = 'auto';
//         carousel.style.width = `${searchFilteredVideos.length * 350}px`;
//       } else {
//         carousel.style.animationPlayState = 'running';
//         carousel.style.overflowX = 'hidden';
//         carousel.style.width = '100%';
//       }
//     };

//     handleCarouselAnimation();

//     const handleMouseEnter = () => {
//       if (category === 'All' && !searchQuery) {
//         carousel.style.animationPlayState = 'paused';
//       }
//     };

//     const handleMouseLeave = () => {
//       if (category === 'All' && !searchQuery) {
//         carousel.style.animationPlayState = 'running';
//       }
//     };

//     carousel.addEventListener('mouseenter', handleMouseEnter);
//     carousel.addEventListener('mouseleave', handleMouseLeave);

//     return () => {
//       carousel.removeEventListener('mouseenter', handleMouseEnter);
//       carousel.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [searchQuery, category, searchFilteredVideos]);

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

//       <div className="overflow-hidden relative py-4">
//         <CategoryFilter categories={categories} setCategory={setCategory} category={category} />
//       </div>

//       {/* Video Carousel */}
//       <div className="relative">
//         <div
//           className="flex gap-4 transition-all"
//           ref={carouselRef}
//           style={{
//             overflowX: 'auto',
//             width: '100%',
//             padding: '10px 0',
//             animation: !searchQuery && category === 'All' ? 'scroll-left 20s linear infinite' : 'none',
//             display: 'flex',
//           }}
//         >
//           {searchFilteredVideos.map((video, index) => (
//             <div key={video.id} className="flex-shrink-0 w-48 bg-gray-800 rounded-lg shadow-lg">
//               <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover rounded-t-lg" />
//               <div className="p-4">
//                 <h3 className="text-white font-semibold">{video.title}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-8">
//         <CountriesSection />
//         <CultureSection />
//         <PopularPeopleSection />
//       </div>

//       <style>
//         {`
//           @keyframes scroll-left {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(-100%);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default VideoDashboard;
import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import VideoCarousel from './VideoCarousel';
import CountriesSection from './CountriesSection';
import CultureSection from './CultureSection';
import PopularPeopleSection from './PopularPeopleSection';
import SearchBar from './SearchBar';

const VideoDashboard = () => {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Comedy', 'Entertainment', 'Education', 'Sports', 'Travel', 'Blog', 'Information', 'Anime', 'Study'];
  const videos = [
    { id: 1, title: 'Funny Video', category: 'Comedy', thumbnail: 'https://via.placeholder.com/200' },
    { id: 2, title: 'Movie Clip', category: 'Entertainment', thumbnail: 'https://via.placeholder.com/200' },
    { id: 3, title: 'Tutorial', category: 'Education', thumbnail: 'https://via.placeholder.com/200' },
    { id: 4, title: 'Football Highlights', category: 'Sports', thumbnail: 'https://via.placeholder.com/200' },
    { id: 5, title: 'Travel Vlog', category: 'Travel', thumbnail: 'https://via.placeholder.com/200' },
    { id: 6, title: 'Daily Blog', category: 'Blog', thumbnail: 'https://via.placeholder.com/200' },
    { id: 7, title: 'Information Video', category: 'Information', thumbnail: 'https://via.placeholder.com/200' },
    { id: 8, title: 'Anime Clip', category: 'Anime', thumbnail: 'https://via.placeholder.com/200' },
    { id: 9, title: 'Study Tips', category: 'Study', thumbnail: 'https://via.placeholder.com/200' },
  ];

  const filteredVideos = category === 'All' ? videos : videos.filter((video) => video.category === category);

  const searchFilteredVideos = filteredVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide shadow-lg">Vibes</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
            Add Video
          </button>
        </div>
      </header>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="overflow-hidden relative py-4">
        <CategoryFilter categories={categories} setCategory={setCategory} category={category} />
      </div>

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
