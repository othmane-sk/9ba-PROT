import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';
import { ThemeToggle } from '../components/ThemeToggle';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { 
  CheckCircle2, Sparkles, Smartphone, BarChart3, 
  ArrowRight, ShieldCheck, Zap
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: 'هواة (Amateur)',
      price: '299',
      features: ['2 Terrains', 'Calendrier interactif', 'Base de clients de base', 'Support par chat'],
      featuresAr: ['ملعبين (2)', 'الجدول المزدوج التفاعلي', 'قاعدة زبائن أساسية', 'الدعم عبر الشات']
    },
    {
      name: 'محترف (Pro)',
      price: '599',
      recommended: true,
      features: ['Terrains Illimités', 'Gestion CRM Avancée', 'Analyses financières complètes', 'Reçus PDF & Impression', 'Support 7/7 par WhatsApp'],
      featuresAr: ['ملاعب غير محدودة', 'إدارة متطورة للزبائن', 'تحليلات مالية متكاملة', 'طباعة الفواتير ووصولات PDF', 'دعم متواصل عبر الواتساب']
    },
    {
      name: 'مجموعة (Elite)',
      price: '999',
      features: ['Multi-clubs (Succursales)', 'Analyses prédictives IA', 'Intégration site de réservation client', 'Gestion du personnel avancée', 'Directeur de compte dédié'],
      featuresAr: ['متعدد الفروع والملاعب', 'تحليلات تنبؤية بالذكاء الاصطناعي', 'موقع خاص لحجز الزبائن', 'إدارة متكاملة للموظفين', 'مرافق حساب خاص بالدعم']
    }
  ];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 ${isRTL ? 'font-arabic' : 'font-french'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header bar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
            ⚽
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">
            {t('common.appName')}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitch />
          <ThemeToggle />
          <button
            onClick={() => navigate('/login')}
            className="hidden sm:inline-flex px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t('nav.login')}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            {t('landing.viewDashboard')}
          </button>
        </div>
      </header>

      {/* Hero section */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold dark:bg-primary/20">
            <Sparkles size={14} />
            <span>الحل الرقمي رقم 1 للملاعب في المغرب</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
            {t('landing.heroTitle')}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {t('landing.heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <span>{t('landing.startDemo')}</span>
              <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <span>{t('landing.viewDashboard')}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">10</p>
              <p className="text-xs md:text-sm text-slate-400 font-medium">ملاعب مدارة حالياً</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">50k+</p>
              <p className="text-xs md:text-sm text-slate-400 font-medium">حجز رقمي ناجح</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">100%</p>
              <p className="text-xs md:text-sm text-slate-400 font-medium">أمان تام للبيانات</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-[40px] -z-10" />
          <div className="bg-white dark:bg-slate-900 p-4 rounded-[24px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs font-semibold text-slate-400 ml-2">لوحة التحكم التفاعلية</span>
            </div>
            {/* Miniature illustration representing dashboard */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                  <div className="w-8 h-2 bg-primary/20 rounded mb-2" />
                  <div className="w-12 h-4 bg-primary/60 rounded" />
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                  <div className="w-8 h-2 bg-secondary/20 rounded mb-2" />
                  <div className="w-12 h-4 bg-secondary/60 rounded" />
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl h-28 flex flex-col justify-end">
                <div className="flex justify-between items-end h-full gap-2">
                  <div className="w-full bg-primary/40 h-8 rounded-sm" />
                  <div className="w-full bg-secondary/40 h-16 rounded-sm" />
                  <div className="w-full bg-primary/60 h-12 rounded-sm" />
                  <div className="w-full bg-primary h-20 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t('landing.featuresTitle')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('landing.featuresSubtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 text-right">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[16px] space-y-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('landing.feat1Title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('landing.feat1Desc')}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[16px] space-y-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('landing.feat2Title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('landing.feat2Desc')}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[16px] space-y-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('landing.feat3Title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('landing.feat3Desc')}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[16px] space-y-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('landing.feat4Title')}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('landing.feat4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t('landing.pricingTitle')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            خطط تسعير بسيطة تلائم حجم ناديك وتضمن عائداً استثمارياً من أول شهر
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-slate-900 p-8 rounded-[20px] shadow-sm border flex flex-col justify-between relative ${
                plan.recommended 
                  ? 'border-primary ring-2 ring-primary/20 scale-105 z-10' 
                  : 'border-slate-100 dark:border-slate-800'
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                  الأكثر مبيعاً
                </span>
              )}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  <div className="flex items-baseline mt-4 gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-slate-500 font-medium">درهم / شهرياً</span>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {(isRTL ? plan.featuresAr : plan.features).map((feat, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate('/login')}
                className={`w-full mt-8 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  plan.recommended 
                    ? 'bg-primary text-white hover:bg-primary-hover shadow-md' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                تفعيل الباقة مجاناً
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials (Moroccan Mock Stadium Owners) */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t('landing.testimonialsTitle')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            أصحاب ملاعب تخلصوا تماماً من الدفاتر الورقية وزاد دخلهم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[16px] border border-slate-100 dark:border-slate-800 space-y-4 text-right">
            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic">
              "كنا نواجه يومياً مشاكل مع الزبائن بسبب تداخل المواعيد وحجز الساعة 20:00 لشخصين بالخطأ. بفضل 'قبة'، انتهت الفوضى تماماً وكل شيء يظهر بوضوح في لوحة التحكم."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-sm text-slate-800">أ.ع</div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">أمين العلمي</h4>
                <p className="text-xs text-slate-400">مالك ملعب Green Arena - فاس</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[16px] border border-slate-100 dark:border-slate-800 space-y-4 text-right">
            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic">
              "الإحصائيات المالية والتقارير الأسبوعية ساعدتني على معرفة الساعات غير المستغلة وقمت بعمل عروض للمدارس لزيادة نسبة الإشغال. الاستثمار في هذا النظام رائع."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-sm text-slate-800">م.ط</div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">محمد طنجاوي</h4>
                <p className="text-xs text-slate-400">مسؤول ملاعب Atlas - طنجة</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[16px] border border-slate-100 dark:border-slate-800 space-y-4 text-right">
            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic">
              "الموظفون في الاستقبال تعلموا استخدام النظام في ربع ساعة فقط لسهولته وكبر أزراره. لم نعد نستخدم القلم والدفتر الورقي على الإطلاق."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold text-sm text-slate-800">ي.ب</div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">ياسين بناني</h4>
                <p className="text-xs text-slate-400">مالك Victory Club - سلا</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
                ⚽
              </div>
              <span className="text-xl font-extrabold text-white">
                {t('common.appName')}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              أول منصة رقمية لإدارة ملاعب القرب وصالات كرة القدم في المغرب.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-200 mb-4">المنتج</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><Link to="/login" className="hover:text-primary">لوحة التحكم</Link></li>
              <li><Link to="/login" className="hover:text-primary">الحجوزات والرزنامة</Link></li>
              <li><Link to="/login" className="hover:text-primary">إدارة الملاعب</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-200 mb-4">الشركة</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#" className="hover:text-primary">من نحن</a></li>
              <li><a href="#" className="hover:text-primary">اتصل بنا</a></li>
              <li><a href="#" className="hover:text-primary">الخصوصية والشروط</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-200 mb-4">الدعم والاتصال</h4>
            <p className="text-xs text-slate-400 font-medium">
              الدار البيضاء، المغرب<br />
              support@9oba.ma<br />
              +212 5 22 45 89 63
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} قبة (9oba). كل الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
};
