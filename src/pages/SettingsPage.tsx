import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../context/StoreContext';
import { Settings, Download } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const store = useStore();

  const handleDownloadBackup = () => {
    const backupData = {
      customers: store.customers,
      fields: store.fields,
      reservations: store.reservations,
      notifications: store.notifications,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `9oba_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="text-primary" size={20} />
          <span>{t('settings.title')}</span>
        </h2>
        <p className="text-xs text-slate-400 font-medium">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-right">
        {/* Left column general configs */}
        <div className="lg:col-span-8 space-y-6">
          {/* General info */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-3">
              {t('settings.clubInfo')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">{t('settings.clubName')}</label>
                <input
                  type="text"
                  defaultValue="Atlas Football Center"
                  className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">العنوان الجغرافي</label>
                <input
                  type="text"
                  defaultValue="شارع المعاريف، الدار البيضاء، المغرب"
                  className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                />
              </div>
            </div>
          </div>

          {/* Working hours */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-3">
              {t('settings.workingHours')}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">وقت البدء اليومي</label>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">وقت الإغلاق اليومي</label>
                <input
                  type="time"
                  defaultValue="00:00"
                  className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right column system configs & backup */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-5 text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto">
              <Download size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('settings.backup')}</h3>
              <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
                حمل كافة الحجوزات والزبائن والملاعب في ملف احتياطي مشفر بصيغة JSON.
              </p>
            </div>
            <button
              onClick={handleDownloadBackup}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-md hover:shadow-primary/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Download size={16} />
              <span>{t('settings.backupBtn')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
