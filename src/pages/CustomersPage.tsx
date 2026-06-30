import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../hooks/useLanguage';
import { Dialog } from '../components/Dialog';
import { Search, UserPlus, Phone, Mail } from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { customers, addCustomer } = useStore();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  // Add Customer modal state
  const [addCustOpen, setAddCustOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStatus, setNewStatus] = useState<'VIP' | 'Regular' | 'New' | 'Blacklisted'>('New');

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.phone.includes(search);
    const matchesStatus = selectedStatus ? c.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Regular': return 'bg-primary/10 text-primary border-primary/20';
      case 'New': return 'bg-info/10 text-info border-info/20';
      case 'Blacklisted': return 'bg-danger/10 text-danger border-danger/20';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'VIP': return t('customers.statusVip');
      case 'Regular': return t('customers.statusRegular');
      case 'New': return t('customers.statusNew');
      case 'Blacklisted': return t('customers.statusBlacklisted');
      default: return status;
    }
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    addCustomer({
      name: newName,
      phone: newPhone,
      email: newEmail || '-',
      status: newStatus,
      favoriteField: 'Atlas 1' // Default favorite field
    });

    setAddCustOpen(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header and CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{t('customers.title')}</h2>
          <p className="text-xs text-slate-400 font-medium">{t('customers.subtitle')}</p>
        </div>
        <button
          onClick={() => setAddCustOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all duration-200 active:scale-95 flex items-center gap-2"
        >
          <UserPlus size={18} />
          <span>{t('customers.newCustomer')}</span>
        </button>
      </div>

      {/* Filter and search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} size={16} />
          <input
            type="text"
            placeholder={t('common.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="py-2.5 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold min-w-[150px]"
        >
          <option value="">فئة الزبائن: الكل</option>
          <option value="VIP">{t('customers.statusVip')}</option>
          <option value="Regular">{t('customers.statusRegular')}</option>
          <option value="New">{t('customers.statusNew')}</option>
          <option value="Blacklisted">{t('customers.statusBlacklisted')}</option>
        </select>
      </div>

      {/* Grid listing customers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((cust) => (
          <div 
            key={cust.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-all duration-200 relative group"
          >
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-sm uppercase">
                {cust.name.split(' ').pop()?.substring(0,2) || 'CL'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                  {cust.name}
                </h3>
                <span className={`inline-block mt-1 px-2.5 py-0.5 text-[9px] font-bold rounded-full border ${getStatusColor(cust.status)}`}>
                  {getStatusLabel(cust.status)}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-2 border-t border-slate-50 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Phone size={14} className="text-slate-400" />
                <span>{cust.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Mail size={14} className="text-slate-400" />
                <span className="truncate">{cust.email}</span>
              </div>
            </div>

            {/* CRM stats summary */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">{t('customers.reservationsCount')}</span>
                <span className="font-extrabold text-slate-800 dark:text-white mt-1 block">{cust.reservationsCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">{t('customers.totalSpent')}</span>
                <span className="font-extrabold text-primary mt-1 block">{cust.totalSpent} DH</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">{t('customers.favoriteField')}</span>
                <span className="font-extrabold text-slate-800 dark:text-white mt-1 block truncate px-1">{cust.favoriteField}</span>
              </div>
            </div>

            {/* Last active label */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-1">
              <span>{t('customers.lastBooking')}:</span>
              <span className="text-slate-600 dark:text-slate-300 font-extrabold">{cust.lastBooking}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      <Dialog
        isOpen={addCustOpen}
        onClose={() => setAddCustOpen(false)}
        title={t('customers.newCustomer')}
      >
        <form onSubmit={handleSaveCustomer} className="space-y-4 text-right">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">اسم الزبون بالكامل</label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
              placeholder="مثال: يوسف العلمي"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">{t('common.phone')}</label>
            <input
              type="text"
              required
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
              placeholder="+212 6..."
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">{t('common.email')} (اختياري)</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
              placeholder="name@email.com"
            />
          </div>

          {/* VIP Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">فئة الزبون</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as any)}
              className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
            >
              <option value="VIP">{t('customers.statusVip')}</option>
              <option value="Regular">{t('customers.statusRegular')}</option>
              <option value="New">{t('customers.statusNew')}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-extrabold shadow-lg hover:shadow-primary/20 transition-all mt-4"
          >
            {t('common.save')}
          </button>
        </form>
      </Dialog>
    </div>
  );
};
