import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../styles/TestimonialCard.module.css';
import { AnimatedElement, ANIMATION_TYPES } from './AnimatedElement';

const TestimonialCard = ({ name, position, quote, avatar, delay = 0 }) => {
  return (
    <AnimatedElement 
      animationType={ANIMATION_TYPES.FADE_IN_UP} 
      delay={delay}
      className={styles.cardWrapper}
    >
      <Card className={styles.testimonialCard}>
        <div className={styles.quoteIcon}>
          <i className="fas fa-quote-left"></i>
        </div>
        <Card.Body className={styles.cardBody}>
          <Card.Text className={styles.quote}>{quote}</Card.Text>
          <div className={styles.authorSection}>
            <div className={styles.avatar}>
              {avatar ? (
                <img src={avatar} alt={name} className={styles.avatarImg} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div className={styles.authorInfo}>
              <h5 className={styles.authorName}>{name}</h5>
              <p className={styles.authorPosition}>{position}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </AnimatedElement>
  );
};

export default TestimonialCard; 