import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/ModernCarousel.module.css';

const ModernCarousel = ({ slides = [], autoplaySpeed = 5000, height = 500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 为向左, -1 为向右
  const [isHovering, setIsHovering] = useState(false);
  const autoplayTimerRef = useRef(null);
  
  // 如果没有轮播数据，返回null
  if (!slides || slides.length === 0) {
    return null;
  }
  
  // 自动播放
  useEffect(() => {
    if (autoplaySpeed > 0 && !isHovering) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, autoplaySpeed);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, autoplaySpeed, isHovering]);
  
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
    setIsHovering(true);
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };
  
  // 鼠标离开时恢复自动播放
  const handleMouseLeave = () => {
    setIsHovering(false);
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
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.95,
      zIndex: 0
    })
  };
  
  // 转场动画配置
  const transition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.5 },
    scale: { duration: 0.5 }
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
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slides[currentIndex].image})`,
                height: `${height}px`
              }}
            >
              <div className={styles.slideOverlay}></div>
              <div className={styles.slideContent}>
                <div className={styles.slideTextContainer}>
                  <motion.h2 
                    className={styles.slideTitle}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {slides[currentIndex].title}
                  </motion.h2>
                  <motion.p 
                    className={styles.slideDescription}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {slides[currentIndex].description}
                  </motion.p>
                  {slides[currentIndex].buttonText && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <Button 
                        variant="primary" 
                        className={styles.slideButton}
                        href={slides[currentIndex].buttonLink || '#'}
                      >
                        {slides[currentIndex].buttonText}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className={`${styles.carouselControls} ${isHovering ? styles.visible : ''}`}>
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
        </div>
        
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