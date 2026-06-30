import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../hooks/useLanguage';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, 
  PieChart, Pie, Cell 
} from 'recharts';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  useStore();

  // Mock data for analytics
  const monthlyRevenue = [
    { name: isRTL ? 'يناير' : 'Jan', revenue: 48000 },
    { name: isRTL ? 'فبراير' : 'Feb', revenue: 52000 },
    { name: isRTL ? 'مارس' : 'Mar', revenue: 61000 },
    { name: isRTL ? 'أبريل' : 'Apr', revenue: 58000 },
    { name: isRTL ? 'ماي' : 'May', revenue: 72000 },
    { name: isRTL ? 'يونيو' : 'Jun', revenue: 84000 }
  ];

  const occupancyByField = [
    { name: 'T1', occupancy: 82 },
    { name: 'T2', occupancy: 75 },
    { name: 'T3', occupancy: 60 },
    { name: 'T4', occupancy: 88 },
    { name: 'T5', occupancy: 45 },
    { name: 'T6', occupancy: 90 },
    { name: 'T7', occupancy: 65 },
    { name: 'T8', occupancy: 78 },
    { name: 'T9', occupancy: 50 },
    { name: 'T10', occupancy: 70 }
  ];

  const paymentMethods = [
    { name: isRTL ? 'نقدا' : 'Cash', value: 45, color: '#16a34a' },
    { name: isRTL ? 'بطاقة' : 'Card', value: 25, color: '#2563eb' },
    { name: 'CMI', value: 20, color: '#0ea5e9' },
    { name: isRTL ? 'تحويل' : 'Transfer', value: 10, color: '#f59e0b' }
  ];

  const avgPlayDuration = [
    { name: '1.0h', value: 35 },
    { name: '1.5h', value: 55 },
    { name: '2.0h', value: 10 }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="text-primary" size={20} />
          <span>{t('analytics.title')}</span>
        </h2>
        <p className="text-xs text-slate-400 font-medium">{t('analytics.subtitle')}</p>
      </div>

      {/* Analytics widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              <span>{t('analytics.monthlyRev')}</span>
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy by field */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users size={16} className="text-secondary" />
              <span>{t('analytics.occupancyByField')}</span>
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyByField} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Bar dataKey="occupancy" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment distributions */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('analytics.paymentDistribution')}</h3>
          </div>
          <div className="h-64 flex flex-col sm:flex-row items-center justify-around">
            <div className="h-44 w-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              {paymentMethods.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-600 dark:text-slate-400">{entry.name}:</span>
                  <span className="text-slate-900 dark:text-white font-extrabold">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Avg Play time */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('analytics.avgDuration')}</h3>
          </div>
          <div className="h-64 flex flex-col sm:flex-row items-center justify-around">
            <div className="h-44 w-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={avgPlayDuration}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    <Cell fill="#16a34a" />
                    <Cell fill="#2563eb" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-primary" />
                <span className="text-slate-600 dark:text-slate-400">1.0 {t('common.hours')}:</span>
                <span className="text-slate-900 dark:text-white font-extrabold">35%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-secondary" />
                <span className="text-slate-600 dark:text-slate-400">1.5 {t('common.hours')}:</span>
                <span className="text-slate-900 dark:text-white font-extrabold">55%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-danger" />
                <span className="text-slate-600 dark:text-slate-400">2.0 {t('common.hours')}:</span>
                <span className="text-slate-900 dark:text-white font-extrabold">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
