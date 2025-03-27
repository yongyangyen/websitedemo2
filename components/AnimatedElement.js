import React, { useRef, useEffect, useState } from 'react';
import { useAnimation } from './AnimationProvider';

// 动画类型选项
const ANIMATION_TYPES = {
  FADE_IN: 'fade-in',
  FADE_IN_UP: 'fade-in-up',
  FADE_IN_DOWN: 'fade-in-down',
  FADE_IN_LEFT: 'fade-in-left',
  FADE_IN_RIGHT: 'fade-in-right',
  ZOOM_IN: 'zoom-in',
  BOUNCE: 'bounce',
  FLIP: 'flip'
};

const AnimatedElement = ({ 
  children, 
  animationType = ANIMATION_TYPES.FADE_IN, 
  delay = 0, 
  duration = 0.8,
  threshold = 0.2,
  once = true,
  className = ''
}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollPosition } = useAnimation();
  
  useEffect(() => {
    const checkVisibility = () => {
      if (!elementRef.current) return;
      
      // 如果只动画一次且已经动画过，直接返回
      if (once && hasAnimated) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // 元素进入视口的阈值
      const isNowVisible = 
        rect.top <= windowHeight * (1 - threshold) &&
        rect.bottom >= 0;
      
      if (isNowVisible && !isVisible) {
        setIsVisible(true);
        if (once) {
          setHasAnimated(true);
        }
      } else if (!isNowVisible && isVisible && !once) {
        setIsVisible(false);
      }
    };
    
    // 初始检查
    checkVisibility();
    
    // 监听滚动事件
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [scrollPosition, once, threshold, isVisible, hasAnimated]);
  
  // 创建动画样式
  const animationStyle = {
    opacity: 0,
    transition: `all ${duration}s ease-out ${delay}s`,
    transform: 'translateY(0)'
  };
  
  // 根据动画类型设置初始样式
  switch (animationType) {
    case ANIMATION_TYPES.FADE_IN_UP:
      animationStyle.transform = 'translateY(30px)';
      break;
    case ANIMATION_TYPES.FADE_IN_DOWN:
      animationStyle.transform = 'translateY(-30px)';
      break;
    case ANIMATION_TYPES.FADE_IN_LEFT:
      animationStyle.transform = 'translateX(30px)';
      break;
    case ANIMATION_TYPES.FADE_IN_RIGHT:
      animationStyle.transform = 'translateX(-30px)';
      break;
    case ANIMATION_TYPES.ZOOM_IN:
      animationStyle.transform = 'scale(0.9)';
      break;
    default:
      break;
  }
  
  // 当元素可见时应用的样式
  const visibleStyle = {
    opacity: 1,
    transform: 'translateY(0) translateX(0) scale(1)'
  };
  
  return (
    <div 
      ref={elementRef} 
      className={`animated-element ${className}`}
      style={isVisible ? { ...animationStyle, ...visibleStyle } : animationStyle}
    >
      {children}
    </div>
  );
};

export { AnimatedElement, ANIMATION_TYPES }; 