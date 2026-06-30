import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-20 h-20 rounded-[28px] bg-red-500/10 text-danger flex items-center justify-center text-4xl shadow-sm animate-pulse-soft">
        ⚽
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {t('notfound.title')}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-sm">
          {t('notfound.desc')}
        </p>
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover shadow-md flex items-center gap-1.5 transition-all"
      >
        <ArrowLeft size={16} />
        <span>{t('notfound.backHome')}</span>
      </button>
    </div>
  );
};
