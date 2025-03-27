import React, { createContext, useState, useEffect } from 'react';

// 创建语言上下文
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

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      if (savedLanguage && languages[savedLanguage]) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language setting:', error);
    }
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

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider; 