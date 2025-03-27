import React, { useState, useEffect, createContext, useMemo } from 'react';

// 创建语言环境上下文
export const LanguageContext = createContext();

// 支持的语言
export const languages = {
  zh: '中文',
  en: 'English',
  ms: 'Bahasa Melayu'
};

// 默认语言
const defaultLanguage = 'zh';

const LanguageProvider = ({ children }) => {
  // 从localStorage加载语言设置（如果有的话）
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 使用立即执行函数，使代码更清晰
    const loadLanguagePreference = () => {
      setIsLoading(true);
      try {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && languages[savedLanguage]) {
          setCurrentLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language setting:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguagePreference();
  }, []);

  // 切换语言
  const changeLanguage = (lang) => {
    if (languages[lang]) {
      setCurrentLanguage(lang);
      try {
        localStorage.setItem('selectedLanguage', lang);
      } catch (error) {
        console.error('Error saving language setting:', error);
      }
    }
  };

  // 使用useMemo优化上下文值，避免不必要的重渲染
  const contextValue = useMemo(() => ({
    currentLanguage, 
    changeLanguage, 
    languages, 
    isLoading
  }), [currentLanguage, isLoading]);

  // 如果仍在加载语言首选项，可以考虑返回空或加载指示器
  // 或者直接渲染子组件，但使用默认语言，取决于具体需求

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider; 