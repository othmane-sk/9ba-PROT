import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../hooks/useLanguage';
import { Dialog } from '../components/Dialog';
import { ChevronRight, ChevronLeft, Plus, Calendar } from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { reservations, fields, customers, addReservation } = useStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCell, setSelectedCell] = useState<{ fieldId: string; time: string } | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  // Form states
  const [newCustId, setNewCustId] = useState(customers[0]?.id || '');
  const [newDuration, setNewDuration] = useState(1.5);
  const [newPaid, setNewPaid] = useState(0);
  const [newMethod, setNewMethod] = useState<'Cash' | 'Card' | 'CMI' | 'Transfer'>('Cash');

  const todayStr = currentDate.toISOString().split('T')[0];
  const timeSlots = ['17:00', '18:30', '20:00', '21:30', '23:00'];

  const getReservationForSlot = (fieldId: string, time: string) => {
    return reservations.find(r => r.fieldId === fieldId && r.time === time && r.date === todayStr && r.status !== 'Cancelled');
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const handleCellClick = (fieldId: string, time: string, isBooked: boolean) => {
    if (isBooked) return;
    setSelectedCell({ fieldId, time });
    setBookingDialogOpen(true);
  };

  const handleSaveBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCell) return;
    
    const cust = customers.find(c => c.id === newCustId);
    const fld = fields.find(f => f.id === selectedCell.fieldId);
    if (!cust || !fld) return;

    const price = fld.price * newDuration;
    const paymentStatus: 'Paid' | 'Unpaid' | 'Partial' = 
      newPaid === 0 ? 'Unpaid' : newPaid >= price ? 'Paid' : 'Partial';

    addReservation({
      customerId: cust.id,
      customerName: cust.name,
      customerPhone: cust.phone,
      fieldId: fld.id,
      fieldName: fld.name,
      fieldNameAr: fld.nameAr,
      date: todayStr,
      time: selectedCell.time,
      duration: newDuration,
      price,
      paidAmount: newPaid,
      paymentMethod: newMethod,
      paymentStatus,
      status: 'Reserved',
      employee: 'رشيد (Receptionist)'
    });

    setBookingDialogOpen(false);
    setSelectedCell(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="text-primary" size={20} />
            <span>{t('calendar.title')}</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">{t('calendar.subtitle')}</p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={handlePrevDay}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <ChevronRight size={18} className={isRTL ? '' : 'rotate-180'} />
          </button>
          <span className="text-sm font-extrabold text-slate-800 dark:text-white min-w-[120px] text-center">
            {todayStr}
          </span>
          <button 
            onClick={handleNextDay}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <ChevronLeft size={18} className={isRTL ? '' : 'rotate-180'} />
          </button>
        </div>
      </div>

      {/* Grid Legend */}
      <div className="flex gap-4 text-xs font-bold bg-white dark:bg-slate-900 p-4 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm justify-center sm:justify-start">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/20" />
          <span className="text-slate-500 dark:text-slate-400">{t('calendar.legendAvailable')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-blue-500/10 border border-blue-500/20" />
          <span className="text-slate-500 dark:text-slate-400">{t('calendar.legendReserved')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-md bg-amber-500/10 border border-amber-500/20" />
          <span className="text-slate-500 dark:text-slate-400">{t('calendar.legendMaintenance')}</span>
        </div>
      </div>

      {/* 10 Fields Calendar Timeline Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold border-b border-slate-100 dark:border-slate-800">
                <th className="p-4 w-28 text-right">الوقت / الملعب</th>
                {fields.map(f => (
                  <th key={f.id} className="p-4 text-center">
                    <span className="block font-bold text-slate-900 dark:text-white">{isRTL ? f.nameAr : f.name}</span>
                    <span className="block text-[10px] text-slate-400 font-medium mt-0.5">{f.capacity}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {timeSlots.map(time => (
                <tr key={time} className="hover:bg-slate-50/10">
                  <td className="p-4 font-extrabold text-xs text-slate-900 dark:text-white bg-slate-50/30">
                    {time}
                  </td>
                  {fields.map(field => {
                    const res = getReservationForSlot(field.id, time);
                    const isBooked = !!res;
                    const isMaintenance = field.status === 'Maintenance';

                    return (
                      <td key={field.id} className="p-2 h-20 text-center">
                        {isMaintenance ? (
                          <div className="w-full h-full bg-amber-500/10 border border-amber-500/20 text-warning rounded-xl flex items-center justify-center text-xs font-bold">
                            {t('fields.statusMaintenance')}
                          </div>
                        ) : isBooked ? (
                          <div className="w-full h-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex flex-col items-center justify-center p-1 text-xs">
                            <span className="font-extrabold truncate max-w-[90px]">{res.customerName.split(' ')[0]}</span>
                            <span className="text-[10px] text-slate-400 font-medium mt-0.5">{res.duration}h • {res.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid'}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleCellClick(field.id, time, false)}
                            className="w-full h-full bg-emerald-500/5 hover:bg-emerald-500/10 border border-dashed border-emerald-500/20 hover:border-emerald-500/40 text-emerald-600 rounded-xl flex items-center justify-center text-xs font-bold transition-all"
                          >
                            <Plus size={14} className="mr-1" />
                            <span>حجز</span>
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog to reserve slot */}
      <Dialog
        isOpen={bookingDialogOpen}
        onClose={() => setBookingDialogOpen(false)}
        title={`${t('reservations.newBooking')} - ${selectedCell?.time} (${todayStr})`}
      >
        {selectedCell && (
          <form onSubmit={handleSaveBooking} className="space-y-4 text-right">
            {/* Customer select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">{t('reservations.formCustomer')}</label>
              <select
                value={newCustId}
                onChange={(e) => setNewCustId(e.target.value)}
                className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">{t('reservations.formDuration')}</label>
                <select
                  value={newDuration}
                  onChange={(e) => setNewDuration(parseFloat(e.target.value))}
                  className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                >
                  <option value="1">1.0 {t('common.hours')}</option>
                  <option value="1.5">1.5 {t('common.hours')}</option>
                  <option value="2">2.0 {t('common.hours')}</option>
                </select>
              </div>

              {/* Paid amount */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">{t('reservations.formPaidAmount')}</label>
                <input
                  type="number"
                  value={newPaid}
                  onChange={(e) => setNewPaid(parseFloat(e.target.value) || 0)}
                  className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">{t('reservations.paymentMethod')}</label>
              <div className="grid grid-cols-4 gap-2">
                {(['Cash', 'Card', 'CMI', 'Transfer'] as const).map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setNewMethod(method)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      newMethod === method 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    {method === 'Cash' ? t('reservations.cash') : method === 'Card' ? t('reservations.card') : method === 'CMI' ? t('reservations.cmi') : t('reservations.transfer')}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-extrabold shadow-lg hover:shadow-primary/20 transition-all mt-4"
            >
              {t('common.save')}
            </button>
          </form>
        )}
      </Dialog>
    </div>
  );
};
