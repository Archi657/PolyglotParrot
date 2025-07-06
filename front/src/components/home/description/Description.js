import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './Description.css'; // Import your custom CSS
// the hook
import { useTranslation } from 'react-i18next';

function Description() {

  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Initialize AOS using the global AOS object
    if (window.AOS) {
      window.AOS.init();
    }
  }, []);

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, [])


  return (
    <div id="example-collapse-text" data-aos="fade-up">
      {t('Home Description')}
    </div>
  );
}

export default Description;
