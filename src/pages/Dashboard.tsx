import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarRange, Landmark, 
  Plus, Users, Sparkles, CloudSun, Compass, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const { reservations, fields, customers, updateFieldStatus } = useStore();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayReservations = reservations.filter(r => r.date === todayStr);
  const completedReservationsCount = todayReservations.filter(r => r.status === 'Completed').length;
  const pendingReservationsCount = todayReservations.filter(r => r.status === 'Pending').length;

  const todayRevenue = todayReservations
    .filter(r => r.status !== 'Cancelled')
    .reduce((acc, r) => acc + r.price, 0);

  const availableFieldsCount = fields.filter(f => f.status === 'Available').length;
  const occupiedFieldsCount = fields.filter(f => f.status === 'Occupied').length;

  // Chart data
  const revenueChartData = [
    { name: isRTL ? 'يناير' : 'Jan', revenue: 48000 },
    { name: isRTL ? 'فبراير' : 'Feb', revenue: 52000 },
    { name: isRTL ? 'مارس' : 'Mar', revenue: 61000 },
    { name: isRTL ? 'أبريل' : 'Apr', revenue: 58000 },
    { name: isRTL ? 'ماي' : 'May', revenue: 72000 },
    { name: isRTL ? 'يونيو' : 'Jun', revenue: 84000 }
  ];

  const peakHoursData = [
    { hour: '17:00', bookings: 12 },
    { hour: '18:30', bookings: 28 },
    { hour: '20:00', bookings: 45 },
    { hour: '21:30', bookings: 42 },
    { hour: '23:00', bookings: 18 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-success/10 text-success border-success/20';
      case 'Occupied': return 'bg-danger/10 text-danger border-danger/20';
      case 'Maintenance': return 'bg-warning/10 text-warning border-warning/20';
      case 'Cleaning': return 'bg-info/10 text-info border-info/20';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Available': return t('fields.statusAvailable');
      case 'Occupied': return t('fields.statusOccupied');
      case 'Maintenance': return t('fields.statusMaintenance');
      case 'Cleaning': return t('fields.statusCleaning');
      default: return status;
    }
  };

  const handleToggleFieldStatus = (id: string, current: string) => {
    const nextStatuses: Record<string, 'Available' | 'Occupied' | 'Maintenance' | 'Cleaning'> = {
      'Available': 'Occupied',
      'Occupied': 'Cleaning',
      'Cleaning': 'Maintenance',
      'Maintenance': 'Available'
    };
    updateFieldStatus(id, nextStatuses[current] || 'Available');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-emerald-600 dark:from-primary/30 dark:to-emerald-800/30 p-6 md:p-8 rounded-[24px] text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg border border-primary/20">
        <div>
          <div className="flex items-center gap-2 mb-2 bg-white/10 dark:bg-slate-800/40 w-fit px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles size={14} />
            <span>{t('dashboard.weatherIdeal')}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold">{t('login.welcomeBack')}، حمزة!</h2>
          <p className="text-emerald-100 dark:text-emerald-300 text-sm mt-1 font-medium">
            تأسس هذا النظام لاستبدال دفاتر الحجز. لديك {todayReservations.length} حجوزات مجدولة لهذا اليوم.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/reservations')}
            className="bg-white text-primary px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 shadow-md transition-all duration-200 active:scale-95 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>{t('dashboard.newReservation')}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('dashboard.statTodayReservations')}</span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <CalendarRange size={20} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              {todayReservations.length}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {completedReservationsCount} منتهية • {pendingReservationsCount} معلقة
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('dashboard.statTodayRevenue')}</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Landmark size={20} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              {todayRevenue} <span className="text-sm font-bold">{t('common.currency')}</span>
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">مداخيل الملاعب الـ 10 المقدرة اليوم</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('dashboard.statAvailableFields')}</span>
            <div className="w-10 h-10 rounded-xl bg-info/10 text-info flex items-center justify-center">
              <Compass size={20} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              {availableFieldsCount} <span className="text-sm font-bold">/ 10</span>
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              ملاعب متاحة الآن للحجز الفوري
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('dashboard.statOccupancyRate')}</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              {occupiedFieldsCount * 10}%
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">معدل الإشغال اللحظي للملاعب</p>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.chartRevenue')}</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">العائدات المالية للنادي الرياضي لآخر 6 أشهر</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Hours & Weather */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weather Widget */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-400">{t('dashboard.weatherTitle')}</h4>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">24°C</p>
              <p className="text-xs text-primary font-bold">{t('dashboard.weatherIdeal')}</p>
            </div>
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
              <CloudSun size={36} />
            </div>
          </div>

          {/* Peak Hours chart */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('dashboard.chartPeakHours')}</h3>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="hour" stroke="#94A3B8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Field Statuses Interactive Panel */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.fieldStatus')}</h3>
          <p className="text-xs text-slate-400 font-medium mt-1">انقر على بطاقة الملعب لتغيير حالته فوراً (متاح، مشغول، تنظيف، صيانة)</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {fields.map((field) => (
            <button
              key={field.id}
              onClick={() => handleToggleFieldStatus(field.id, field.status)}
              className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-right hover:border-primary/40 dark:hover:border-primary/40 hover:-translate-y-0.5 transition-all focus:outline-none flex flex-col justify-between h-28"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-xs font-bold text-slate-400">{t('fields.fieldNum')} {field.id.replace('f', '')}</span>
                <span className="text-[10px] font-medium text-slate-400">{field.capacity}</span>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white truncate">
                  {isRTL ? field.nameAr : field.name}
                </h4>
                <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-bold rounded-full border ${getStatusColor(field.status)}`}>
                  {getStatusLabel(field.status)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Bookings timeline */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <span>{t('dashboard.timeline')}</span>
          </h3>

          <div className="space-y-4 border-r dark:border-slate-800 pr-4 mt-2">
            {todayReservations.length === 0 ? (
              <p className="text-sm text-slate-400 font-medium">{t('common.noData')}</p>
            ) : (
              todayReservations.map((res) => (
                <div key={res.id} className="relative pb-2">
                  {/* Timeline dot */}
                  <span className="absolute top-1 -right-6 w-3.5 h-3.5 rounded-full bg-primary border-4 border-white dark:border-slate-900" />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{res.customerName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                        {isRTL ? res.fieldNameAr : res.fieldName} • {res.time} ({res.duration} {t('common.hours')})
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                      res.paymentStatus === 'Paid' 
                        ? 'bg-success/10 text-success border-success/20' 
                        : res.paymentStatus === 'Partial'
                        ? 'bg-warning/10 text-warning border-warning/20'
                        : 'bg-danger/10 text-danger border-danger/20'
                    }`}>
                      {res.paymentStatus === 'Paid' ? t('reservations.payPaid') : res.paymentStatus === 'Partial' ? t('reservations.payPartial') : t('reservations.payUnpaid')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Latest Customers (CRM highlight) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('dashboard.recentCustomers')}</h3>
          
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {customers.slice(0, 4).map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs uppercase">
                    {c.name.split(' ').pop()?.substring(0,2) || 'CL'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.name.split(' ')[0]}</h4>
                    <p className="text-xs text-slate-400">{c.phone}</p>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {c.totalSpent} {t('common.currency')}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium">{c.reservationsCount} {t('nav.reservations')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
