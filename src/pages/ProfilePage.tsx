import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, ShieldCheck } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();

  const activityLogs = [
    { action: 'تغيير حالة الملعب رقم 5 إلى صيانة', time: 'اليوم، 12:00' },
    { action: 'إضافة حجز جديد للزبون أمين الشرايبي بقيمة 525 درهم', time: 'اليوم، 10:30' },
    { action: 'تسجيل دخول ناجح للنظام من Casablanca, MA', time: 'اليوم، 08:15' },
    { action: 'تحديث أوقات العمل في إعدادات النادي', time: 'أمس، 18:40' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="text-primary" size={20} />
          <span>{t('profile.title')}</span>
        </h2>
        <p className="text-xs text-slate-400 font-medium">{t('profile.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-6">
          <div className="w-24 h-24 rounded-[32px] bg-primary/10 text-primary flex items-center justify-center text-3xl font-extrabold mx-auto shadow-sm">
            HM
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">حمزة منصوري</h3>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mt-2">
              <ShieldCheck size={14} />
              <span>{t('profile.admin')}</span>
            </span>
          </div>

          {/* Details list */}
          <div className="text-right text-xs space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span className="font-bold">اسم المستخدم:</span>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">hamza_manager</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span className="font-bold">البريد الإلكتروني:</span>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">admin@9oba.ma</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span className="font-bold">الهاتف:</span>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">+212 6 61 23 45 67</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span className="font-bold">تاريخ الانضمام:</span>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">12 يناير 2026</span>
            </div>
          </div>
        </div>

        {/* System Activity Logs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 text-right">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('profile.activityLog')}</h3>
          
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {activityLogs.map((log, idx) => (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{log.action}</p>
                <span className="text-[10px] text-slate-400 font-medium block mt-1.5">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
