import React, { useEffect, useRef } from 'react';

const SectionCarousel = ({ items }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    // Clear existing items
    while (carousel.firstChild) {
      carousel.removeChild(carousel.firstChild);
    }

    // Populate the carousel with items
    items.forEach((item) => {
      const itemBox = document.createElement('div');
      itemBox.className =
        'min-w-[250px] bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';

      const title = document.createElement('h3');
      title.className = 'text-lg font-semibold p-4 text-white';
      title.textContent = item;

      itemBox.appendChild(title);
      carousel.appendChild(itemBox);
    });

    // Enable seamless looping
    const originalItems = Array.from(carousel.children);
    const cloneCount = Math.min(5, originalItems.length); // Adjust clone count as needed
    for (let i = 0; i < cloneCount; i++) {
      const clone = originalItems[i].cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      carousel.appendChild(clone);
    }

    const totalWidth = Array.from(carousel.children).reduce(
      (acc, child) => acc + child.offsetWidth,
      0
    );

    carousel.style.width = `${totalWidth}px`;
    carousel.style.animation = 'scroll-left 60s linear infinite';
  }, [items]);

  return (
    <div className="overflow-hidden relative py-4">
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

export default SectionCarousel;
