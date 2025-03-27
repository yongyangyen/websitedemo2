import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from '../styles/HeroSection.module.css';
import { AnimatedElement, ANIMATION_TYPES } from './AnimatedElement';
import useTranslation from './useTranslation';

const HeroSection = ({ title, subtitle, buttonText, buttonLink, backgroundImage }) => {
  const { t } = useTranslation();
  
  return (
    <section 
      className={styles.heroSection}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}></div>
      <Container className={styles.container}>
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="text-center">
            <AnimatedElement 
              animationType={ANIMATION_TYPES.FADE_IN_DOWN} 
              delay={0.2}
            >
              <h1 className={styles.title}>{title}</h1>
            </AnimatedElement>
            
            <AnimatedElement 
              animationType={ANIMATION_TYPES.FADE_IN_UP} 
              delay={0.4}
            >
              <p className={styles.subtitle}>{subtitle}</p>
            </AnimatedElement>
            
            <AnimatedElement 
              animationType={ANIMATION_TYPES.FADE_IN_UP} 
              delay={0.6}
            >
              <Button 
                variant="primary" 
                size="lg" 
                href={buttonLink}
                className={styles.button}
              >
                {buttonText}
              </Button>
              
              <div className={styles.trust}>
                <span>{t('hero.trusted')}</span>
                <div className={styles.trustStars}>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <span>{t('hero.basedOn')} 1000+ {t('hero.reviews')}</span>
              </div>
            </AnimatedElement>
          </Col>
        </Row>
      </Container>
      
      <div className={styles.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,202.7C672,224,768,224,864,202.7C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 