import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LanguageContext, languages } from './LanguageProvider';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useContext(LanguageContext);
  
  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" size="sm" id="dropdown-language" className="language-switcher">
        {languages[currentLanguage]}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.entries(languages).map(([code, name]) => (
          <Dropdown.Item 
            key={code} 
            onClick={() => changeLanguage(code)}
            active={currentLanguage === code}
          >
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher; 