import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Phone } from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t('help.howToBook'),
      a: t('help.howToBookAns')
    },
    {
      q: t('help.paperReplace'),
      a: t('help.paperReplaceAns')
    },
    {
      q: 'هل يمكنني تغيير أسعار الملاعب بشكل مؤقت (ساعات ليلية)؟',
      a: 'نعم، من خلال الدخول إلى صفحة الملاعب والضغط على "تعديل"، يمكنك تحديد أسعار مختلفة للفترات الصباحية أو المسائية لتتناسب مع أوقات الذروة.'
    },
    {
      q: 'كيف يمكنني سحب تقرير الأرباح الشهري؟',
      a: 'في صفحة "التحليلات المالية"، ستجد تقريراً مفصلاً لمداخيل النادي والأرباح ونسب الإشغال لكل ملعب، مع إمكانية تصديرها كملف Excel أو طباعتها.'
    }
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || 
                                       f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 pb-12 text-right">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="text-primary" size={20} />
          <span>{t('help.title')}</span>
        </h2>
        <p className="text-xs text-slate-400 font-medium">{t('help.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FAQs Accordion */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="relative mb-4">
            <Search className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="ابحث عن سؤالك..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs pr-9 pl-3 focus:outline-none focus:ring-2 focus:ring-primary font-bold"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full p-4 flex justify-between items-center text-xs font-extrabold text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <span>{faq.q}</span>
                  {openIndex === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openIndex === idx && (
                  <div className="p-4 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-50 dark:border-slate-800 leading-relaxed bg-white dark:bg-slate-900 font-semibold">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-5">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('help.supportContact')}</h3>
            <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
              فريق الدعم الفني المغربي جاهز لمساعدتك في تهيئة النظام ونقل دفاتر الحجز الورقية مجاناً.
            </p>
          </div>

          <div className="text-xs space-y-2 border-t border-slate-50 dark:border-slate-800 pt-4 text-right">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Phone size={14} className="text-slate-400" />
              <span className="font-extrabold">الواتساب: +212 6 61 45 89 63</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Phone size={14} className="text-slate-400" />
              <span className="font-extrabold">المكالمات: +212 5 22 45 89 63</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
