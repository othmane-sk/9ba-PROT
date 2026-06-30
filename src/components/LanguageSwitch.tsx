import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const LanguageSwitch: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
          language === 'ar'
            ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        🇲🇦 العربية
      </button>
      <button
        onClick={() => changeLanguage('fr')}
        className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
          language === 'fr'
            ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        🇫🇷 Français
      </button>
    </div>
  );
};
