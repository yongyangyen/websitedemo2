import { useContext, useMemo } from 'react';
import { LanguageContext } from './LanguageProvider';
import translations from './translations';

// 获取翻译的Hook
export const useTranslation = () => {
  const { currentLanguage, isLoading } = useContext(LanguageContext);
  
  // 使用useMemo缓存翻译函数，避免组件重新渲染时重新创建函数
  const { t, currentTranslations } = useMemo(() => {
    // 获取指定键的翻译
    const translationFunction = (key) => {
      // 处理null或undefined键
      if (key == null) return '';
      
      // 处理嵌套键，例如 'nav.home'
      const keys = key.split('.');
      let value = translations[currentLanguage];
      
      // 安全地访问嵌套属性
      try {
        for (const k of keys) {
          if (value === undefined) return key;
          value = value[k];
        }
        
        // 如果获取不到翻译，尝试使用默认语言（中文）的翻译
        if (value === undefined && currentLanguage !== 'zh') {
          value = getDefaultTranslation(key);
        }
        
        return value || key;
      } catch (error) {
        console.error(`Translation error for key "${key}":`, error);
        return key;
      }
    };
    
    // 辅助函数：尝试从默认语言获取翻译
    const getDefaultTranslation = (key) => {
      const keys = key.split('.');
      let value = translations['zh']; // 使用中文作为默认
      
      for (const k of keys) {
        if (value === undefined) break;
        value = value[k];
      }
      
      return value;
    };
    
    return { 
      t: translationFunction,
      currentTranslations: translations[currentLanguage] || translations['zh']
    };
  }, [currentLanguage]);
  
  return { t, currentLanguage, isLoading, currentTranslations };
};

export default useTranslation; 