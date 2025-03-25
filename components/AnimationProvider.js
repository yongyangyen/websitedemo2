import React, { createContext, useContext, useState, useEffect } from 'react';

// 创建动画上下文
export const AnimationContext = createContext();

// 动画效果提供组件
export const AnimationProvider = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      if (!isScrolling) {
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 150);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);
  
  // 检测元素是否在视口中
  const isInViewport = (element) => {
    if (!element) return false;
    
    try {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    } catch (error) {
      console.error('Error checking if element is in viewport:', error);
      return false;
    }
  };
  
  return (
    <AnimationContext.Provider value={{ isScrolling, scrollPosition, isInViewport }}>
      {children}
    </AnimationContext.Provider>
  );
};

// 创建自定义钩子以便于使用动画上下文
export const useAnimation = () => useContext(AnimationContext);

export default AnimationProvider; 