import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';
import translations from './translations';

// 获取翻译的Hook
export const useTranslation = () => {
  const { currentLanguage } = useContext(LanguageContext);
  
  // 获取指定键的翻译
  const t = (key) => {
    // 处理嵌套键，例如 'nav.home'
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  };
  
  return { t, currentLanguage };
};

export default useTranslation; 