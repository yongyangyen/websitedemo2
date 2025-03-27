import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../styles/FeatureCard.module.css';
import { AnimatedElement, ANIMATION_TYPES } from './AnimatedElement';

const FeatureCard = ({ icon, title, description, delay = 0, buttonText, buttonLink }) => {
  return (
    <AnimatedElement 
      animationType={ANIMATION_TYPES.FADE_IN_UP} 
      delay={delay}
      className={styles.cardWrapper}
    >
      <Card className={styles.featureCard}>
        <div className={styles.iconWrapper}>
          <i className={`${icon} ${styles.icon}`}></i>
        </div>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>{title}</Card.Title>
          <Card.Text className={styles.cardDescription}>{description}</Card.Text>
          {buttonText && (
            <a href={buttonLink || '#'} className={styles.cardLink}>
              {buttonText} <i className="fas fa-arrow-right"></i>
            </a>
          )}
        </Card.Body>
      </Card>
    </AnimatedElement>
  );
};

export default FeatureCard; 