import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/globals.css';
import LanguageProvider from '../components/LanguageProvider';
import SiteDataProvider from '../components/SiteDataProvider';
import AnimationProvider from '../components/AnimationProvider';

function MyApp({ Component, pageProps }) {
  // 在客户端加载Bootstrap的JS
  useEffect(() => {
    // 只在客户端执行
    if (typeof window !== 'undefined') {
      // 导入Bootstrap的JS
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <AnimationProvider>
      <LanguageProvider>
        <SiteDataProvider>
          <Component {...pageProps} />
        </SiteDataProvider>
      </LanguageProvider>
    </AnimationProvider>
  );
}

export default MyApp; 