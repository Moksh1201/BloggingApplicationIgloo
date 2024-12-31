// import React, { useEffect, useRef } from 'react';

// const VideoCarousel = ({ filteredVideos, category, searchQuery }) => {
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     const carousel = carouselRef.current;

//     // Reset carousel children for filtered videos
//     while (carousel.firstChild) {
//       carousel.removeChild(carousel.firstChild);
//     }

//     // Populate the carousel with filtered videos
//     filteredVideos.forEach((video) => {
//       const videoItem = document.createElement('div');
//       videoItem.className = 'min-w-[350px] bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-110 hover:mx-2 hover:shadow-xl';

//       const img = document.createElement('img');
//       img.src = video.thumbnail;
//       img.alt = video.title;
//       img.className = 'w-full h-40 object-cover';

//       const details = document.createElement('div');
//       details.className = 'p-4';

//       const title = document.createElement('h3');
//       title.className = 'text-lg font-semibold';
//       title.textContent = video.title;

//       const categoryText = document.createElement('p');
//       categoryText.className = 'text-sm text-gray-400';
//       categoryText.textContent = `Category: ${video.category}`;

//       details.appendChild(title);
//       details.appendChild(categoryText);
//       videoItem.appendChild(img);
//       videoItem.appendChild(details);
//       carousel.appendChild(videoItem);
//     });

//     // Handle seamless looping only for "All" category without search query
//     if (category === 'All' && !searchQuery) {
//       const items = Array.from(carousel.children);
//       const cloneCount = Math.min(5, items.length); // Adjust as necessary
//       for (let i = 0; i < cloneCount; i++) {
//         const clone = items[i].cloneNode(true);
//         clone.setAttribute('aria-hidden', 'true');
//         carousel.appendChild(clone);
//       }

//       const totalWidth = Array.from(carousel.children).reduce(
//         (acc, child) => acc + child.offsetWidth,
//         0
//       );

//       carousel.style.width = `${totalWidth}px`;
//       carousel.style.animation = 'scroll-left 70s linear infinite';
//     } else {
//       carousel.style.animation = 'none';
//     }

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
//   }, [filteredVideos, category, searchQuery]);

//   return (
//     <div className="overflow-hidden relative py-8">
//       <div
//         ref={carouselRef}
//         className="flex gap-4"
//         style={{
//           display: 'flex',
//           whiteSpace: 'nowrap',
//           overflow: 'hidden',
//         }}
//       ></div>
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

// export default VideoCarousel;
import React, { useEffect, useRef } from 'react';

const VideoCarousel = ({ filteredVideos, category, searchQuery }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    // Reset carousel children for filtered videos
    while (carousel.firstChild) {
      carousel.removeChild(carousel.firstChild);
    }

    // Populate the carousel with filtered videos
    filteredVideos.forEach((video) => {
      const videoItem = document.createElement('div');
      videoItem.className = 'min-w-[350px] bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-110 hover:mx-2 hover:shadow-xl';

      const img = document.createElement('img');
      img.src = video.thumbnail;
      img.alt = video.title;
      img.className = 'w-full h-40 object-cover';

      const details = document.createElement('div');
      details.className = 'p-4';

      const title = document.createElement('h3');
      title.className = 'text-lg font-semibold';
      title.textContent = video.title;

      const categoryText = document.createElement('p');
      categoryText.className = 'text-sm text-gray-400';
      categoryText.textContent = `Category: ${video.category}`;

      details.appendChild(title);
      details.appendChild(categoryText);
      videoItem.appendChild(img);
      videoItem.appendChild(details);
      carousel.appendChild(videoItem);
    });

    // Handle animation logic based on search query and category
    if (category === 'All' && !searchQuery) {
      // Enable seamless looping
      const items = Array.from(carousel.children);
      const cloneCount = Math.min(5, items.length); // Adjust as necessary
      for (let i = 0; i < cloneCount; i++) {
        const clone = items[i].cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        carousel.appendChild(clone);
      }

      const totalWidth = Array.from(carousel.children).reduce(
        (acc, child) => acc + child.offsetWidth,
        0
      );

      carousel.style.width = `${totalWidth}px`;
      carousel.style.animation = 'scroll-left 30s linear infinite';
    } else {
      // Disable animation when filtering or searching
      carousel.style.animation = 'none';
    }
  }, [filteredVideos, category, searchQuery]);

  return (
    <div className="overflow-hidden relative py-8">
      <div
        ref={carouselRef}
        className="flex gap-4"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      ></div>
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default VideoCarousel;
