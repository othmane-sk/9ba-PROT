import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../context/StoreContext';
import { Bell, CheckCheck, AlertTriangle, Landmark, CalendarRange, Ban } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { t } = useTranslation();
  const { notifications, markAllNotificationsRead } = useStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return <CalendarRange className="text-primary" size={18} />;
      case 'cancel': return <Ban className="text-danger" size={18} />;
      case 'payment': return <Landmark className="text-success" size={18} />;
      case 'maintenance': return <AlertTriangle className="text-warning" size={18} />;
      default: return <Bell className="text-slate-400" size={18} />;
    }
  };

  const getNotificationText = (n: any) => {
    switch (n.type) {
      case 'booking':
        return t('notifications.newBookingMsg', { field: n.fieldId?.replace('f', ''), customer: n.customerName });
      case 'cancel':
        return t('notifications.cancelledMsg', { field: n.fieldId?.replace('f', ''), customer: n.customerName });
      case 'payment':
        return t('notifications.paymentReceivedMsg', { amount: n.amount, customer: n.customerName });
      case 'maintenance':
        return t('notifications.maintenanceMsg', { field: n.fieldId?.replace('f', '') });
      default:
        return 'تحديث جديد في النظام';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="text-primary" size={20} />
            <span>{t('notifications.title')}</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">{t('notifications.subtitle')}</p>
        </div>
        <button
          onClick={markAllNotificationsRead}
          className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
        >
          <CheckCheck size={16} />
          <span>{t('notifications.markAllRead')}</span>
        </button>
      </div>

      {/* Notifications list */}
      <div className="bg-white dark:bg-slate-900 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium">
            <Bell size={32} className="mx-auto text-slate-300 mb-2" />
            <span>لا توجد تنبيهات جديدة</span>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-5 flex items-start gap-4 transition-colors ${n.read ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/10'}`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className={`text-xs font-bold text-slate-800 dark:text-slate-200 ${!n.read && 'text-slate-950 font-extrabold'}`}>
                  {getNotificationText(n)}
                </p>
                <span className="text-[10px] text-slate-400 font-medium block mt-1.5">
                  {n.timestamp}
                </span>
              </div>
              {!n.read && (
                <span className="w-2.5 h-2.5 bg-primary rounded-full mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
