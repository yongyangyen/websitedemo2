import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useTranslation from './useTranslation';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>{t('footer.about')}</h5>
            <p>{t('footer.aboutDesc')}</p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>{t('footer.contactInfo')}</h5>
            <p>
              <i className="fas fa-map-marker-alt me-2"></i> 吉隆坡市中心商业区<br />
              <i className="fas fa-phone me-2"></i> +60 123456789<br />
              <i className="fas fa-envelope me-2"></i> info@loansservice.com
            </p>
          </Col>
          <Col md={4}>
            <h5>{t('footer.followUs')}</h5>
            <div className="d-flex">
              <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} 贷款服务 | {t('footer.copyright')}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 