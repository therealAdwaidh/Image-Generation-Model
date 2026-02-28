import React from 'react';

const ImageCarousel = ({ direction = 'right' }) => {
  const rightImages = [
    '/carousel-images/img1.png',
    '/carousel-images/img2.png',
    '/carousel-images/img3.png',
    '/carousel-images/img4.png',
    '/carousel-images/img5.png',
  ];
  const leftImages = [
    '/carousel-images/img6.png',
    '/carousel-images/img7.png',
    '/carousel-images/img8.png',
    '/carousel-images/img9.png',
    '/carousel-images/img10.png',
  ];

  const carouselImages = direction === 'right' 
    ? [...rightImages, ...rightImages] 
    : [...leftImages, ...leftImages];

  // Triple images to ensure the loop is absolutely seamless on all screen sizes
  const displayImages = [...carouselImages, ...carouselImages, ...carouselImages];

  return (
    <div className={`carousel-container ${direction}`}>
      <div className={`carousel-track scroll-${direction}`}>
        {displayImages.map((src, index) => (
          <div className="carousel-item" key={index}>
            <img src={src} alt={`Showcase ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
