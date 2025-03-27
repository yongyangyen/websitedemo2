import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import ModernCarousel from '../components/ModernCarousel';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import ContactForm from '../components/ContactForm';
import HeroSection from '../components/HeroSection';
import { SiteDataContext } from '../components/SiteDataProvider';
import useTranslation from '../components/useTranslation';
import { AnimatedElement, ANIMATION_TYPES } from '../components/AnimatedElement';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { siteData, isLoading } = useContext(SiteDataContext);
  const { carouselSlides, features, testimonials, contactInfo, heroSection } = siteData || {};
  const { t } = useTranslation();

  useEffect(() => {
    console.log("首页加载 - siteData:", siteData);
    console.log("轮播图数据:", carouselSlides);
    console.log("数据加载状态:", isLoading);
  }, [siteData, isLoading]);

  return (
    <Layout title="贷款服务 - 首页">
      {/* 英雄区域 */}
      {!isLoading && heroSection && (
        <HeroSection 
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          buttonText={t('hero.buttonText')}
          buttonLink={heroSection.buttonLink}
          backgroundImage={heroSection.backgroundImage}
        />
      )}

      {/* 轮播图区域 */}
      {!isLoading && carouselSlides && carouselSlides.length > 0 && (
        <ModernCarousel slides={carouselSlides} />
      )}

      {/* 服务特点区域 */}
      {!isLoading && features && features.length > 0 && (
        <section className={styles.featuresSection}>
          <Container>
            <AnimatedElement 
              animationType={ANIMATION_TYPES.FADE_IN_UP} 
              delay={0.2}
            >
              <h2 className={styles.sectionTitle}>{t('services.title')}</h2>
              <p className={styles.sectionSubtitle}>{t('services.subtitle')}</p>
            </AnimatedElement>
            
            <Row>
              {features.map((feature, index) => (
                <Col md={6} lg={4} key={feature.id} className="mb-4">
                  <FeatureCard 
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={0.1 * (index + 1)}
                    buttonText={t('services.learnMore')}
                    buttonLink="#contact"
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* 客户评价区域 */}
      {!isLoading && testimonials && testimonials.length > 0 && (
        <section className={styles.testimonialsSection}>
          <Container>
            <AnimatedElement 
              animationType={ANIMATION_TYPES.FADE_IN_UP} 
              delay={0.2}
            >
              <h2 className={styles.sectionTitle}>{t('testimonials.title')}</h2>
              <p className={styles.sectionSubtitle}>{t('testimonials.subtitle')}</p>
            </AnimatedElement>
            
            <Row>
              {testimonials.map((testimonial, index) => (
                <Col md={6} lg={4} key={testimonial.id} className="mb-4">
                  <TestimonialCard 
                    name={testimonial.name}
                    position={testimonial.position}
                    quote={testimonial.quote}
                    avatar={testimonial.avatar}
                    delay={0.1 * (index + 1)}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* 联系我们区域 */}
      {!isLoading && contactInfo && (
        <section id="contact" className={styles.contactSection}>
          <Container>
            <Row>
              <Col md={12} lg={5} className="mb-4 mb-lg-0">
                <AnimatedElement 
                  animationType={ANIMATION_TYPES.FADE_IN_LEFT} 
                  delay={0.2}
                >
                  <div className={styles.contactInfo}>
                    <h2 className={styles.contactTitle}>{t('contact.title')}</h2>
                    <p className={styles.contactDescription}>{t('contact.description')}</p>
                    
                    <div className={styles.contactDetails}>
                      <div className={styles.contactItem}>
                        <div className={styles.contactIcon}>
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className={styles.contactText}>
                          <h4>{t('contact.address')}</h4>
                          <p>{contactInfo.address}</p>
                        </div>
                      </div>
                      
                      <div className={styles.contactItem}>
                        <div className={styles.contactIcon}>
                          <i className="fas fa-phone"></i>
                        </div>
                        <div className={styles.contactText}>
                          <h4>{t('contact.phone')}</h4>
                          <p>{contactInfo.phone}</p>
                        </div>
                      </div>
                      
                      <div className={styles.contactItem}>
                        <div className={styles.contactIcon}>
                          <i className="fas fa-envelope"></i>
                        </div>
                        <div className={styles.contactText}>
                          <h4>{t('contact.email')}</h4>
                          <p>{contactInfo.email}</p>
                        </div>
                      </div>
                      
                      <div className={styles.contactItem}>
                        <div className={styles.contactIcon}>
                          <i className="fas fa-clock"></i>
                        </div>
                        <div className={styles.contactText}>
                          <h4>{t('contact.hours')}</h4>
                          <p>{contactInfo.businessHours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              </Col>
              
              <Col md={12} lg={7}>
                <ContactForm />
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </Layout>
  );
} 