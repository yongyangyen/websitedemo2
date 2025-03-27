import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import LoanCards from '../components/LoanCards';
import FeatureCard from '../components/FeatureCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ContactForm from '../components/ContactForm';
import { SiteDataContext } from '../components/SiteDataProvider';
import styles from '../styles/Home.module.css';
import useTranslation from '../components/useTranslation';
import { AnimatedElement, ANIMATION_TYPES } from '../components/AnimatedElement';

export default function Home() {
  const { siteData, isLoading } = useContext(SiteDataContext);
  const { t } = useTranslation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <main>
        <HeroSection 
          title={t('hero.title')} 
          subtitle={t('hero.subtitle')}
          buttonText={t('hero.buttonText')}
          buttonLink={siteData.heroSection.buttonLink}
          backgroundImage={siteData.heroSection.backgroundImage}
        />
        
        <LoanCards cards={siteData.loanCards} />
        
        <section className={styles.featuresSection}>
          <Container>
            <h2 className="text-center mb-5">{t('features.title')}</h2>
            <Row>
              {siteData.features.map((feature) => (
                <Col md={6} lg={4} key={feature.id} className="mb-4">
                  <FeatureCard 
                    icon={feature.icon} 
                    title={feature.title} 
                    description={feature.description}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        
        <section className={styles.testimonialsSection}>
          <TestimonialCarousel testimonials={siteData.testimonials} />
        </section>
        
        <section className={styles.contactSection} id="contact">
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
                          <p>{siteData.contactInfo.address}</p>
                        </div>
                      </div>
                      
                      <div className={styles.contactItem}>
                        <div className={styles.contactIcon}>
                          <i className="fas fa-phone"></i>
                        </div>
                        <div className={styles.contactText}>
                          <h4>{t('contact.phone')}</h4>
                          <p>{siteData.contactInfo.phone}</p>
                        </div>
                      </div>
                      
                      <div className={styles.contactItem}>
                        <div className={styles.contactIcon}>
                          <i className="fas fa-envelope"></i>
                        </div>
                        <div className={styles.contactText}>
                          <h4>{t('contact.email')}</h4>
                          <p>{siteData.contactInfo.email}</p>
                        </div>
                      </div>
                      
                      <div className={styles.contactItem}>
                        <div className={styles.contactIcon}>
                          <i className="fas fa-clock"></i>
                        </div>
                        <div className={styles.contactText}>
                          <h4>{t('contact.hours')}</h4>
                          <p>{siteData.contactInfo.businessHours}</p>
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
      </main>
    </Layout>
  );
} 