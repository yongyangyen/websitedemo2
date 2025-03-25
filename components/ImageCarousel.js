import React, { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';

const ImageCarousel = ({ slides = [] }) => {
  const [index, setIndex] = useState(0);

  // 如果没有轮播数据，返回null
  if (!slides || slides.length === 0) {
    return null;
  }

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-wrapper my-5">
      <Container>
        <Carousel 
          activeIndex={index} 
          onSelect={handleSelect}
          indicators={true}
          controls={true}
          interval={5000}
          className="main-carousel"
        >
          {slides.map((slide) => (
            <Carousel.Item key={slide.id}>
              <div 
                className="carousel-image"
                style={{
                  height: '500px',
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <div className="carousel-caption">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        
        {/* 自定义指示器显示在右下角 */}
        <div className="custom-carousel-indicators">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              className={`indicator-dot ${slideIndex === index ? 'active' : ''}`}
              onClick={() => handleSelect(slideIndex)}
              aria-label={`Slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ImageCarousel; 