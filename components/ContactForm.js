import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from '../styles/ContactForm.module.css';
import { AnimatedElement, ANIMATION_TYPES } from './AnimatedElement';
import useTranslation from './useTranslation';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { t } = useTranslation();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // 清除成功消息
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <AnimatedElement 
      animationType={ANIMATION_TYPES.FADE_IN_UP} 
      delay={0.2}
      className={styles.formWrapper}
    >
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>{t('contact.sendMessage')}</h3>
        
        {showSuccess && (
          <Alert 
            variant="success" 
            className={styles.alert}
            onClose={() => setShowSuccess(false)} 
            dismissible
          >
            {t('contact.successMessage')}
          </Alert>
        )}
        
        {showError && (
          <Alert 
            variant="danger" 
            className={styles.alert}
            onClose={() => setShowError(false)} 
            dismissible
          >
            {t('contact.errorMessage')}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className={styles.formLabel}>{t('contact.name')}</Form.Label>
            <Form.Control 
              type="text" 
              id="name" 
              className={styles.formControl}
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className={styles.formLabel}>{t('contact.email')}</Form.Label>
            <Form.Control 
              type="email" 
              id="email" 
              className={styles.formControl}
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className={styles.formLabel}>{t('contact.phone')}</Form.Label>
            <Form.Control 
              type="tel" 
              id="phone" 
              className={styles.formControl}
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label className={styles.formLabel}>{t('contact.message')}</Form.Label>
            <Form.Control 
              as="textarea" 
              id="message" 
              rows={4}
              className={styles.formControl}
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </Form.Group>
          
          <Button 
            variant="primary" 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {t('contact.sending')}
              </>
            ) : (
              t('contact.send')
            )}
          </Button>
        </Form>
      </div>
    </AnimatedElement>
  );
};

export default ContactForm; 