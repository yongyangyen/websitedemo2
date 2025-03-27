import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AnimatedElement, ANIMATION_TYPES } from './AnimatedElement';
import TestimonialCard from './TestimonialCard';
import styles from '../styles/TestimonialCarousel.module.css';
import useTranslation from './useTranslation';

const TestimonialCarousel = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const { t } = useTranslation();
  
  // 根据屏幕大小调整显示的评价数量
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 992) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 更新显示的评价
  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      const total = testimonials.length;
      const startIndex = activeIndex % total;
      
      let items = [];
      for (let i = 0; i < itemsPerPage; i++) {
        const index = (startIndex + i) % total;
        items.push({
          testimonial: testimonials[index],
          index
        });
      }
      
      setDisplayedItems(items);
    }
  }, [testimonials, activeIndex, itemsPerPage]);
  
  // 下一页
  const handleNext = () => {
    setActiveIndex(prev => prev + 1);
  };
  
  // 上一页
  const handlePrev = () => {
    setActiveIndex(prev => {
      if (prev === 0) {
        return testimonials.length - 1;
      }
      return prev - 1;
    });
  };
  
  // 跳转到特定评价
  const goToIndex = (index) => {
    setActiveIndex(index);
  };
  
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  return (
    <div className={styles.testimonialCarouselWrapper}>
      <Container>
        <AnimatedElement animationType={ANIMATION_TYPES.FADE_IN_UP} delay={0.2}>
          <h2 className={styles.sectionTitle}>{t('testimonials.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('testimonials.subtitle')}</p>
        </AnimatedElement>
        
        <div className={styles.carouselContainer}>
          <Row className="justify-content-center">
            {displayedItems.map(({ testimonial, index }, i) => (
              <Col md={itemsPerPage === 1 ? 12 : 6} lg={itemsPerPage === 3 ? 4 : 6} key={`${testimonial.id}-${index}`}>
                <TestimonialCard
                  name={testimonial.name}
                  position={testimonial.position}
                  quote={testimonial.quote}
                  avatar={testimonial.avatar}
                  rating={testimonial.rating || 5}
                  delay={0.1 * (i + 1)}
                />
              </Col>
            ))}
          </Row>
          
          {testimonials.length > itemsPerPage && (
            <div className={styles.carouselControls}>
              <Button 
                variant="light" 
                className={styles.controlButton}
                onClick={handlePrev}
                aria-label="上一页"
              >
                <i className="fas fa-chevron-left"></i>
              </Button>
              
              <div className={styles.indicators}>
                {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map((_, index) => {
                  const isActive = Math.floor(activeIndex / itemsPerPage) === index;
                  return (
                    <button
                      key={index}
                      className={`${styles.indicator} ${isActive ? styles.active : ''}`}
                      onClick={() => goToIndex(index * itemsPerPage)}
                      aria-label={`第 ${index + 1} 页评价`}
                    />
                  );
                })}
              </div>
              
              <Button 
                variant="light" 
                className={styles.controlButton}
                onClick={handleNext}
                aria-label="下一页"
              >
                <i className="fas fa-chevron-right"></i>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TestimonialCarousel; 