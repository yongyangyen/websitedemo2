import React, { createContext, useState, useEffect, useMemo } from 'react';

// 创建网站数据上下文
export const SiteDataContext = createContext();

// 默认网站数据
const defaultSiteData = {
  heroSection: {
    title: '快速、便捷的贷款服务',
    subtitle: '满足您的各种资金需求，简化贷款流程',
    buttonText: '立即申请',
    buttonLink: '#contact',
    backgroundImage: '/images/hero-bg.jpg'
  },
  loanCards: [
    {
      id: 1,
      bankName: 'RHB Bank',
      bankLogo: '/images/rhb-logo.png',
      rateTitle: '贷款利率低至',
      rateValue: '8.59',
      rateUnit: '% p.a.',
      rateNote: '24小时审批*',
      features: [
        '快速审批流程',
        '灵活还款选项',
        '无隐藏费用'
      ],
      actionText: '立即申请',
      actionLink: '#contact',
      terms: '*条款与条件适用'
    },
    {
      id: 2,
      bankName: 'Alliance Bank',
      bankLogo: '/images/alliance-logo.png',
      rateTitle: '利率低至',
      rateValue: '4.99',
      rateUnit: '% + 30%',
      rateNote: '现金返还*',
      features: [
        '保证最低利率',
        '现金返还奖励',
        '简化的申请流程'
      ],
      actionText: '了解更多',
      actionLink: '#contact',
      terms: '*条款与条件适用，有效期从2023年1月至2023年5月'
    },
    {
      id: 3,
      bankName: 'MBSB Bank',
      bankLogo: '/images/mbsb-logo.png',
      rateTitle: '利润率低至',
      rateValue: '7.62',
      rateUnit: '% p.a.',
      rateNote: '最高可融资RM200,000',
      features: [
        '伊斯兰融资方案',
        '高额贷款上限',
        '灵活的还款期限'
      ],
      actionText: '立即申请',
      actionLink: '#contact',
      terms: '*条款与条件适用'
    }
  ],
  features: [
    {
      id: 1,
      icon: 'fas fa-money-bill-wave',
      title: '个人贷款',
      description: '满足您的个人资金需求，灵活的还款选项'
    },
    {
      id: 2,
      icon: 'fas fa-home',
      title: '房屋贷款',
      description: '低利率的房屋贷款，帮助您实现住房梦想'
    },
    {
      id: 3,
      icon: 'fas fa-car',
      title: '汽车贷款',
      description: '快速批准的汽车贷款，让您轻松拥有爱车'
    },
    {
      id: 4,
      icon: 'fas fa-university',
      title: '教育贷款',
      description: '投资未来，支持您的教育发展'
    },
    {
      id: 5,
      icon: 'fas fa-briefcase',
      title: '商业贷款',
      description: '助力您的业务增长，提供资金支持'
    },
    {
      id: 6,
      icon: 'fas fa-hand-holding-usd',
      title: '小额贷款',
      description: '满足短期资金需求，简单便捷的申请流程'
    }
  ],
  testimonials: [
    {
      id: 1,
      name: '张先生',
      position: '企业家',
      quote: '通过贷款服务获得的商业贷款帮助我扩大了业务规模，服务非常专业！',
      avatar: '/images/avatar1.jpg',
      rating: 5
    },
    {
      id: 2,
      name: '李女士',
      position: '教师',
      quote: '房屋贷款办理非常顺利，顾问提供了详细的指导，让整个过程变得简单。',
      avatar: '/images/avatar2.jpg',
      rating: 5
    },
    {
      id: 3,
      name: '王先生',
      position: '工程师',
      quote: '申请过程快速高效，很满意贷款服务提供的汽车贷款方案。',
      avatar: '/images/avatar3.jpg',
      rating: 4
    }
  ],
  contactInfo: {
    address: '吉隆坡市中心商业区',
    phone: '+60 123456789',
    email: 'info@loansservice.com',
    businessHours: '周一至周五: 9:00 AM - 5:00 PM'
  }
};

const SiteDataProvider = ({ children }) => {
  // 初始状态设置为默认值，避免undefined状态
  const [siteData, setSiteData] = useState(() => ({ ...defaultSiteData }));
  const [isLoading, setIsLoading] = useState(true);
  const [dataInitialized, setDataInitialized] = useState(false);

  // 使用useEffect只在组件挂载时加载一次数据
  useEffect(() => {
    const loadSiteData = () => {
      setIsLoading(true);
      
      try {
        const savedData = localStorage.getItem('siteData');
        
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          
          // 确保所有必要的字段都存在，使用深合并
          const mergedData = {
            ...defaultSiteData,
            ...parsedData,
            heroSection: { 
              ...defaultSiteData.heroSection,
              ...(parsedData.heroSection || {}) 
            },
            loanCards: Array.isArray(parsedData.loanCards) && parsedData.loanCards.length > 0
              ? parsedData.loanCards
              : defaultSiteData.loanCards,
            features: Array.isArray(parsedData.features) && parsedData.features.length > 0
              ? parsedData.features
              : defaultSiteData.features,
            testimonials: Array.isArray(parsedData.testimonials) && parsedData.testimonials.length > 0
              ? parsedData.testimonials
              : defaultSiteData.testimonials,
            contactInfo: { 
              ...defaultSiteData.contactInfo,
              ...(parsedData.contactInfo || {}) 
            }
          };
          
          setSiteData(mergedData);
        }
      } catch (error) {
        console.error('Error loading site data:', error);
        // 出错时使用默认数据
        setSiteData(defaultSiteData);
      } finally {
        setIsLoading(false);
        setDataInitialized(true);
      }
    };
    
    loadSiteData();
  }, []);

  // 保存数据到localStorage
  const updateSiteData = (newData) => {
    setSiteData(prevData => {
      const updatedData = { ...prevData, ...newData };
      try {
        localStorage.setItem('siteData', JSON.stringify(updatedData));
      } catch (error) {
        console.error('Error saving site data:', error);
      }
      return updatedData;
    });
  };

  // 重置为默认数据
  const resetToDefault = () => {
    setSiteData(defaultSiteData);
    try {
      localStorage.removeItem('siteData');
    } catch (error) {
      console.error('Error removing site data:', error);
    }
  };

  // 使用useMemo优化context值，避免不必要的重渲染
  const contextValue = useMemo(() => ({
    siteData,
    updateSiteData,
    resetToDefault,
    isLoading,
    dataInitialized
  }), [siteData, isLoading, dataInitialized]);

  return (
    <SiteDataContext.Provider value={contextValue}>
      {children}
    </SiteDataContext.Provider>
  );
};

export default SiteDataProvider; 