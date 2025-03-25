import React, { createContext, useState, useEffect } from 'react';

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
  carouselSlides: [
    {
      id: 1,
      image: '/images/carousel-1.jpg',
      title: '专业贷款咨询',
      description: '我们提供专业的贷款咨询服务，帮助您找到最适合的方案',
      buttonText: '了解更多',
      buttonLink: '#contact'
    },
    {
      id: 2,
      image: '/images/carousel-2.jpg',
      title: '低利率贷款',
      description: '提供市场上最具竞争力的利率，助您实现财务目标'
    },
    {
      id: 3,
      image: '/images/carousel-3.jpg',
      title: '快速审批',
      description: '简化流程，最快24小时内完成审批'
    },
    {
      id: 4,
      image: '/images/carousel-4.jpg',
      title: '灵活还款方式',
      description: '根据您的财务状况，提供多种灵活的还款方式'
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
      avatar: '/images/avatar1.jpg'
    },
    {
      id: 2,
      name: '李女士',
      position: '教师',
      quote: '房屋贷款办理非常顺利，顾问提供了详细的指导，让整个过程变得简单。',
      avatar: '/images/avatar2.jpg'
    },
    {
      id: 3,
      name: '王先生',
      position: '工程师',
      quote: '申请过程快速高效，很满意贷款服务提供的汽车贷款方案。',
      avatar: '/images/avatar3.jpg'
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
  // 从localStorage加载数据（如果有的话）
  const [siteData, setSiteData] = useState(defaultSiteData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('siteData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // 确保所有必要的字段都存在
        const mergedData = {
          ...defaultSiteData,
          ...parsedData,
          heroSection: parsedData.heroSection || defaultSiteData.heroSection,
          carouselSlides: parsedData.carouselSlides || defaultSiteData.carouselSlides
        };
        setSiteData(mergedData);
      }
    } catch (error) {
      console.error('Error loading site data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 保存数据到localStorage
  const updateSiteData = (newData) => {
    setSiteData(newData);
    try {
      localStorage.setItem('siteData', JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving site data:', error);
    }
  };

  // 重置为默认数据
  const resetToDefault = () => {
    setSiteData(defaultSiteData);
    localStorage.removeItem('siteData');
  };

  return (
    <SiteDataContext.Provider value={{ siteData, updateSiteData, resetToDefault, isLoading }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export default SiteDataProvider; 