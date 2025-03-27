import React, { useState, useContext, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/LoanCards.module.css';
import { SiteDataContext } from './SiteDataProvider';
import useTranslation from './useTranslation';

// 使用React.memo优化单个贷款卡片组件的渲染
const LoanCard = memo(({ card, index }) => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // 处理图片加载完成
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);
  
  // 处理图片加载错误
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true); // 标记为已加载，以移除占位符
  }, []);
  
  // 卡片动画变体
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: (i) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }),
    hover: {
      y: -10,
      boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };
  
  return (
    <motion.div
      className={styles.loanCard}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      layoutId={`card-${card.id}`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.bankLogo}>
          {!imageLoaded && !imageError && (
            <div className={styles.imagePlaceholder} />
          )}
          <img
            src={imageError ? '/images/bank-logo-placeholder.png' : card.bankLogo}
            alt={card.bankName}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ 
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.rateContainer}>
          <div className={styles.rateTitle}>
            {card.rateTitle || t('loanCard.rateTitle')}
          </div>
          <div className={styles.rateValue}>
            {card.rateValue}
            <span className={styles.rateUnit}>{card.rateUnit}</span>
          </div>
          {card.rateNote && (
            <div className={styles.rateNote}>{card.rateNote}</div>
          )}
        </div>
        
        <div className={styles.featuresContainer}>
          <ul className={styles.featuresList}>
            {card.features && card.features.map((feature, i) => (
              <li key={i} className={styles.featureItem}>
                <i className={`fas fa-check ${styles.featureIcon}`}></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.cardFooter}>
          <a 
            href={card.actionLink || '#contact'} 
            className={styles.actionButton}
          >
            {card.actionText || t('loanCard.actionText')}
          </a>
          <div className={styles.terms}>
            {card.terms || '*' + t('loanCard.terms')}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// 添加显示名称，便于调试
LoanCard.displayName = 'LoanCard';

// 使用memo优化整个贷款卡片列表组件
const LoanCards = memo(() => {
  const { siteData, isLoading } = useContext(SiteDataContext);
  const { t, isLoading: translationLoading } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const [cards, setCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  
  // 当siteData加载完成后更新卡片数据
  useEffect(() => {
    if (!isLoading && siteData && siteData.loanCards) {
      // 确保每个卡片都有唯一的稳定ID
      const processedCards = siteData.loanCards.map((card, index) => ({
        ...card,
        id: card.id || index + 1
      }));
      
      setCards(processedCards);
      
      // 初始显示3张卡片或全部（如果少于3张）
      const initialCount = Math.min(3, processedCards.length);
      setDisplayedCards(processedCards.slice(0, initialCount));
      setHasMore(processedCards.length > initialCount);
    }
  }, [isLoading, siteData]);
  
  // 切换显示所有/部分卡片
  const toggleShowAll = useCallback(() => {
    if (showAll) {
      // 只显示前3张
      setDisplayedCards(cards.slice(0, 3));
    } else {
      // 显示全部
      setDisplayedCards(cards);
    }
    setShowAll(!showAll);
  }, [showAll, cards]);
  
  // 如果卡片数据为空，显示占位符
  if (isLoading || translationLoading || !cards.length) {
    return (
      <div className={styles.loanCardsSection}>
        <div className="container">
          <h2 className="section-title">{t('loanCards.title')}</h2>
          <p className="section-description text-center mb-5">{t('loanCards.subtitle')}</p>
          <div className={styles.loadingPlaceholder}></div>
        </div>
      </div>
    );
  }
  
  return (
    <section className={styles.loanCardsSection}>
      <div className="container">
        <h2 className="section-title text-center">{t('loanCards.title')}</h2>
        <p className="section-description text-center mb-5">{t('loanCards.subtitle')}</p>
        
        <AnimatePresence mode="wait">
          <div className={styles.loanCardsContainer}>
            {displayedCards.map((card, index) => (
              <LoanCard 
                key={`card-${card.id}`} 
                card={card} 
                index={index} 
              />
            ))}
          </div>
        </AnimatePresence>
        
        {hasMore && (
          <div className={styles.toggleContainer}>
            <button 
              className={styles.toggleButton}
              onClick={toggleShowAll}
            >
              {showAll ? t('loanCards.showLess') : t('loanCards.showMore')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

// 添加显示名称，便于调试
LoanCards.displayName = 'LoanCards';

export default LoanCards; 