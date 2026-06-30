import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { ThemeToggle } from '../components/ThemeToggle';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertTriangle, LogIn } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@9oba.ma');
  const [password, setPassword] = useState('admin');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError(t('login.errorMsg'));
      return;
    }

    setLoading(true);

    // Mock network lag
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('9oba_logged_in', 'true');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative px-4 ${isRTL ? 'font-arabic' : 'font-french'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Absolute top action bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
            ⚽
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">
            {t('common.appName')}
          </span>
        </div>
        <div className="flex items-center gap-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>

      {/* Main card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-[24px] shadow-2xl border border-slate-100 dark:border-slate-800 mt-20"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 rounded-[20px] bg-primary/10 text-primary flex items-center justify-center text-3xl mx-auto shadow-sm">
            ⚽
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {t('login.welcomeBack')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('login.subtitle')}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 text-danger border border-red-100 dark:border-red-900/30 rounded-xl text-sm font-semibold flex items-center gap-2">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {t('login.emailLabel')}
            </label>
            <div className="relative">
              <Mail className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all font-semibold ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                placeholder="admin@9oba.ma"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {t('login.passwordLabel')}
            </label>
            <div className="relative">
              <Lock className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 transition-all font-semibold ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Extra options */}
          <div className="flex items-center justify-between text-xs font-bold pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-slate-600 dark:text-slate-400">{t('login.rememberMe')}</span>
            </label>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">
              {t('login.forgotPassword')}
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={18} />
                <span>{t('login.loginBtn')}</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
