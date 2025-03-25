import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/ModernCarousel.module.css';

const ModernCarousel = ({ slides = [], autoplaySpeed = 5000, height = 500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 为向左, -1 为向右
  const autoplayTimerRef = useRef(null);
  
  // 如果没有轮播数据，返回null
  if (!slides || slides.length === 0) {
    return null;
  }
  
  // 自动播放
  useEffect(() => {
    if (autoplaySpeed > 0) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, autoplaySpeed);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, autoplaySpeed]);
  
  // 下一张幻灯片
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  
  // 上一张幻灯片
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };
  
  // 点击导航点切换幻灯片
  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };
  
  // 鼠标悬停时暂停自动播放
  const handleMouseEnter = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };
  
  // 鼠标离开时恢复自动播放
  const handleMouseLeave = () => {
    if (autoplaySpeed > 0) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, autoplaySpeed);
    }
  };
  
  // 动画变体
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };
  
  // 转场动画配置
  const transition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };
  
  return (
    <div 
      className={styles.carouselContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ height: `${height}px` }}
    >
      <Container fluid className={styles.carouselWrapper}>
        <div className={styles.slideContainer}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className={styles.slide}
              style={{
                backgroundImage: `url(${slides[currentIndex].image})`,
                height: `${height}px`
              }}
            >
              <div className={styles.slideContent}>
                <div className={styles.slideTextContainer}>
                  <h2 className={styles.slideTitle}>{slides[currentIndex].title}</h2>
                  <p className={styles.slideDescription}>{slides[currentIndex].description}</p>
                  {slides[currentIndex].buttonText && (
                    <Button 
                      variant="primary" 
                      className={styles.slideButton}
                      href={slides[currentIndex].buttonLink || '#'}
                    >
                      {slides[currentIndex].buttonText}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <Button 
          variant="light" 
          className={`${styles.carouselControl} ${styles.carouselControlPrev}`}
          onClick={handlePrevious}
          aria-label="上一页"
        >
          <i className="fas fa-chevron-left"></i>
        </Button>
        
        <Button 
          variant="light" 
          className={`${styles.carouselControl} ${styles.carouselControlNext}`}
          onClick={handleNext}
          aria-label="下一页"
        >
          <i className="fas fa-chevron-right"></i>
        </Button>
        
        <div className={styles.carouselIndicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`幻灯片 ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ModernCarousel; 