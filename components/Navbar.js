import React from 'react';
import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LanguageSwitcher from './LanguageSwitcher';
import useTranslation from './useTranslation';

const MainNavbar = () => {
  const { t } = useTranslation();
  
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>
            <span className="fw-bold fs-4 text-primary">贷款服务</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-3">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>{t('nav.home')}</Nav.Link>
            </Link>
            <Link href="/#services" passHref legacyBehavior>
              <Nav.Link>{t('nav.services')}</Nav.Link>
            </Link>
            <Link href="/#testimonials" passHref legacyBehavior>
              <Nav.Link>{t('nav.testimonials')}</Nav.Link>
            </Link>
            <Link href="/#contact" passHref legacyBehavior>
              <Nav.Link>{t('nav.contact')}</Nav.Link>
            </Link>
          </Nav>
          <LanguageSwitcher />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar; 