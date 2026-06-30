import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { useStore } from '../context/StoreContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { 
  LayoutDashboard, CalendarRange, Calendar, Trophy, 
  Users, BarChart3, Bell, Settings, HelpCircle, 
  User, LogOut, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { notifications } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const unreadNotifications = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      setCurrentTime(date.toLocaleDateString(isRTL ? 'ar-MA' : 'fr-MA', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [isRTL]);

  const navItems = [
    { path: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { path: '/reservations', label: t('nav.reservations'), icon: CalendarRange },
    { path: '/calendar', label: t('nav.calendar'), icon: Calendar },
    { path: '/fields', label: t('nav.fields'), icon: Users }, // icon override or soccer related
    { path: '/customers', label: t('nav.customers'), icon: Users },
    { path: '/analytics', label: t('nav.analytics'), icon: BarChart3 },
    { path: '/notifications', label: t('nav.notifications'), icon: Bell, badge: unreadNotifications },
    { path: '/settings', label: t('nav.settings'), icon: Settings },
    { path: '/help', label: t('nav.help'), icon: HelpCircle },
    { path: '/profile', label: t('nav.profile'), icon: User }
  ];

  const handleLogout = () => {
    localStorage.removeItem('9oba_logged_in');
    navigate('/');
  };

  const getBreadcrumbLabel = () => {
    const current = navItems.find(item => item.path === location.pathname);
    return current ? current.label : t('common.home');
  };

  return (
    <div className={`min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 ${isRTL ? 'font-arabic' : 'font-french'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex flex-col bg-white dark:bg-slate-900 border-r dark:border-slate-800 transition-all duration-300 z-30 shrink-0 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${isRTL ? 'border-l border-r-0' : 'border-r'}`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
            ⚽
          </div>
          {sidebarOpen && (
            <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('common.appName')}
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-3 py-3 rounded-xl font-semibold transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-slate-100'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'} />
                {sidebarOpen && (
                  <span className="text-sm truncate">
                    {item.label}
                  </span>
                )}
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <span className={`absolute top-2.5 right-3 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold text-white bg-danger ${!sidebarOpen && 'top-1 right-1'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer (Logout) */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-danger dark:hover:text-red-400 font-semibold transition-colors duration-200`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm">{t('nav.logout')}</span>}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-20">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle button (desktop) */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Mobile menu open button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb / Title */}
            <div>
              <h1 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white capitalize leading-tight">
                {getBreadcrumbLabel()}
              </h1>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium hidden sm:inline">
                {currentTime}
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <ThemeToggle />
            
            {/* Notifications Shortcut */}
            <Link 
              to="/notifications" 
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full ring-2 ring-white dark:ring-slate-900" />
              )}
            </Link>

            {/* Profile Avatar */}
            <Link 
              to="/profile" 
              className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-sm hover:scale-105 transition-transform"
            >
              HM
            </Link>
          </div>
        </header>

        {/* Scrollable View Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full h-full max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>

        {/* Mobile Navigation Bar */}
        <nav className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 h-16 fixed bottom-0 left-0 right-0 z-30 flex justify-around items-center px-4">
          <Link to="/dashboard" className={`flex flex-col items-center justify-center text-xs font-bold ${location.pathname === '/dashboard' ? 'text-primary' : 'text-slate-400'}`}>
            <LayoutDashboard size={20} />
            <span className="mt-1">{t('nav.dashboard')}</span>
          </Link>
          <Link to="/reservations" className={`flex flex-col items-center justify-center text-xs font-bold ${location.pathname === '/reservations' ? 'text-primary' : 'text-slate-400'}`}>
            <CalendarRange size={20} />
            <span className="mt-1">{t('nav.reservations')}</span>
          </Link>
          <Link to="/fields" className={`flex flex-col items-center justify-center text-xs font-bold ${location.pathname === '/fields' ? 'text-primary' : 'text-slate-400'}`}>
            <Trophy size={20} />
            <span className="mt-1">{t('nav.fields')}</span>
          </Link>
          <Link to="/customers" className={`flex flex-col items-center justify-center text-xs font-bold ${location.pathname === '/customers' ? 'text-primary' : 'text-slate-400'}`}>
            <Users size={20} />
            <span className="mt-1">{t('nav.customers')}</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center justify-center text-xs font-bold ${location.pathname === '/profile' ? 'text-primary' : 'text-slate-400'}`}>
            <User size={20} />
            <span className="mt-1">{t('nav.profile')}</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer (Overlay Drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-72 bg-white dark:bg-slate-900 border-r dark:border-slate-800 shadow-2xl flex flex-col p-6`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
                    ⚽
                  </div>
                  <span className="text-xl font-extrabold text-primary">
                    {t('common.appName')}
                  </span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-3 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-sm">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="mr-auto w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold text-white bg-danger">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-danger font-semibold transition-colors"
                >
                  <LogOut size={20} />
                  <span className="text-sm">{t('nav.logout')}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
