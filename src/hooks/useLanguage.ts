import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'ar');

  const changeLanguage = (lang: 'ar' | 'fr') => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    localStorage.setItem('9oba_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    const lang = i18n.language || 'ar';
    setCurrentLang(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [i18n.language]);

  return {
    language: currentLang as 'ar' | 'fr',
    isRTL: currentLang === 'ar',
    changeLanguage,
  };
}
