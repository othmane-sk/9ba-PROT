import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../hooks/useLanguage';
import { Dialog } from '../components/Dialog';
import { 
  Search, Grid, List, Plus, 
  Trash2, Printer, Ban, Phone 
} from 'lucide-react';
import type { Reservation } from '../data/mockData';

export const ReservationsPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { 
    reservations, fields, customers, 
    addReservation, cancelReservation, deleteReservation 
  } = useStore();

  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [search, setSearch] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  // Modals state
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

  // New Booking Form State
  const [newCustId, setNewCustId] = useState(customers[0]?.id || '');
  const [newFieldId, setNewFieldId] = useState(fields[0]?.id || '');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('19:30');
  const [newDuration, setNewDuration] = useState(1.5);
  const [newPaid, setNewPaid] = useState(0);
  const [newMethod, setNewMethod] = useState<'Cash' | 'Card' | 'CMI' | 'Transfer'>('Cash');
  const [newNotes, setNewNotes] = useState('');

  // Filter reservations
  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.customerName.toLowerCase().includes(search.toLowerCase()) || 
                          res.customerPhone.includes(search);
    const matchesField = selectedField ? res.fieldId === selectedField : true;
    const matchesStatus = selectedStatus ? res.status === selectedStatus : true;
    const matchesPayment = selectedPayment ? res.paymentStatus === selectedPayment : true;
    return matchesSearch && matchesField && matchesStatus && matchesPayment;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Reserved': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Completed': return 'bg-success/10 text-success border-success/20';
      case 'Cancelled': return 'bg-danger/10 text-danger border-danger/20';
      case 'Pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const getPaymentStyle = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-success/10 text-success border-success/20';
      case 'Partial': return 'bg-warning/10 text-warning border-warning/20';
      case 'Unpaid': return 'bg-danger/10 text-danger border-danger/20';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Reserved': return t('reservations.statusReserved');
      case 'Completed': return t('reservations.statusCompleted');
      case 'Cancelled': return t('reservations.statusCancelled');
      case 'Pending': return t('reservations.statusPending');
      default: return status;
    }
  };

  const getPaymentLabel = (status: string) => {
    switch (status) {
      case 'Paid': return t('reservations.payPaid');
      case 'Partial': return t('reservations.payPartial');
      case 'Unpaid': return t('reservations.payUnpaid');
      default: return status;
    }
  };

  const handleOpenReceipt = (res: Reservation) => {
    setSelectedRes(res);
    setReceiptDialogOpen(true);
  };

  const handleSaveBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === newCustId);
    const fld = fields.find(f => f.id === newFieldId);
    if (!cust || !fld) return;

    // Calculate final price based on field hourly price and duration
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
      date: newDate,
      time: newTime,
      duration: newDuration,
      price,
      paidAmount: newPaid,
      paymentMethod: newMethod,
      paymentStatus,
      status: 'Reserved',
      notes: newNotes,
      employee: 'رشيد (Receptionist)'
    });

    setBookingDialogOpen(false);
    // Reset defaults
    setNewNotes('');
    setNewPaid(0);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header and CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{t('reservations.title')}</h2>
          <p className="text-xs text-slate-400 font-medium">{t('reservations.subtitle')}</p>
        </div>
        <button
          onClick={() => setBookingDialogOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all duration-200 active:scale-95 flex items-center gap-2"
        >
          <Plus size={18} />
          <span>{t('reservations.newBooking')}</span>
        </button>
      </div>

      {/* Filter and layout options */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} size={16} />
            <input
              type="text"
              placeholder={t('common.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
            />
          </div>

          {/* Field filter */}
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
          >
            <option value="">{t('reservations.filterField')}: {t('common.all')}</option>
            {fields.map(f => (
              <option key={f.id} value={f.id}>{isRTL ? f.nameAr : f.name}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
          >
            <option value="">{t('reservations.filterStatus')}: {t('common.all')}</option>
            <option value="Reserved">{t('reservations.statusReserved')}</option>
            <option value="Completed">{t('reservations.statusCompleted')}</option>
            <option value="Cancelled">{t('reservations.statusCancelled')}</option>
            <option value="Pending">{t('reservations.statusPending')}</option>
          </select>

          {/* Payment filter */}
          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
          >
            <option value="">{t('reservations.filterPayment')}: {t('common.all')}</option>
            <option value="Paid">{t('reservations.payPaid')}</option>
            <option value="Partial">{t('reservations.payPartial')}</option>
            <option value="Unpaid">{t('reservations.payUnpaid')}</option>
          </select>
        </div>

        {/* View toggles */}
        <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-3">
          <span className="text-xs text-slate-400 font-bold">
            {filteredReservations.length} {t('nav.reservations')}
          </span>
          <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-md ${viewMode === 'card' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Reservations Display */}
      {filteredReservations.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[20px] text-center border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
          <div className="text-4xl">🗒️</div>
          <h4 className="text-base font-bold text-slate-800 dark:text-white">{t('common.noData')}</h4>
          <p className="text-xs text-slate-400 font-medium">حاول تعديل الفلتر أو أضف حجزاً جديداً.</p>
        </div>
      ) : viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReservations.map((res) => (
            <div 
              key={res.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-[16px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 relative overflow-hidden group hover:border-primary/30 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                    {res.customerName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                    <Phone size={12} />
                    <span>{res.customerPhone}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${getStatusStyle(res.status)}`}>
                  {getStatusLabel(res.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <p className="text-slate-400 font-bold">{t('common.field')}</p>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{isRTL ? res.fieldNameAr : res.fieldName}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold">{t('common.date')} & {t('common.time')}</p>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{res.date} • {res.time}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold">{t('common.duration')}</p>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{res.duration} {t('common.hours')}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold">{t('common.price')}</p>
                  <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">{res.price} {t('common.currency')}</p>
                </div>
              </div>

              {/* Badges footer */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-50 dark:border-slate-800/60">
                <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md border ${getPaymentStyle(res.paymentStatus)}`}>
                  {getPaymentLabel(res.paymentStatus)}
                </span>

                <div className="flex gap-1.5">
                  <button 
                    onClick={() => handleOpenReceipt(res)}
                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                    title={t('common.print')}
                  >
                    <Printer size={14} />
                  </button>
                  {res.status === 'Reserved' && (
                    <button 
                      onClick={() => cancelReservation(res.id)}
                      className="p-2 bg-red-50 dark:bg-red-950/20 text-danger rounded-lg hover:bg-danger/20 transition-colors"
                      title={t('reservations.cancelBooking')}
                    >
                      <Ban size={14} />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteReservation(res.id)}
                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-slate-900 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4 text-right">{t('common.customer')}</th>
                  <th className="p-4 text-right">{t('common.field')}</th>
                  <th className="p-4 text-right">{t('common.date')} & {t('common.time')}</th>
                  <th className="p-4 text-right">{t('common.duration')}</th>
                  <th className="p-4 text-right">{t('common.price')}</th>
                  <th className="p-4 text-right">{t('common.status')}</th>
                  <th className="p-4 text-right">{t('common.payment')}</th>
                  <th className="p-4 text-center">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors font-medium">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{res.customerName}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{res.customerPhone}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                      {isRTL ? res.fieldNameAr : res.fieldName}
                    </td>
                    <td className="p-4">{res.date} • {res.time}</td>
                    <td className="p-4">{res.duration} {t('common.hours')}</td>
                    <td className="p-4 font-extrabold text-slate-900 dark:text-white">{res.price} {t('common.currency')}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${getStatusStyle(res.status)}`}>
                        {getStatusLabel(res.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md border ${getPaymentStyle(res.paymentStatus)}`}>
                        {getPaymentLabel(res.paymentStatus)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1.5 justify-center">
                        <button 
                          onClick={() => handleOpenReceipt(res)}
                          className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"
                        >
                          <Printer size={13} />
                        </button>
                        {res.status === 'Reserved' && (
                          <button 
                            onClick={() => cancelReservation(res.id)}
                            className="p-1.5 bg-red-50 dark:bg-red-950/20 rounded-lg text-danger"
                          >
                            <Ban size={13} />
                          </button>
                        )}
                        <button 
                          onClick={() => deleteReservation(res.id)}
                          className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dialog for NEW BOOKING */}
      <Dialog 
        isOpen={bookingDialogOpen} 
        onClose={() => setBookingDialogOpen(false)}
        title={t('reservations.newBooking')}
      >
        <form onSubmit={handleSaveBooking} className="space-y-4">
          {/* Customer select */}
          <div className="space-y-1.5 text-right">
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

          {/* Field select */}
          <div className="space-y-1.5 text-right">
            <label className="text-xs font-bold text-slate-500">{t('reservations.formField')}</label>
            <select
              value={newFieldId}
              onChange={(e) => setNewFieldId(e.target.value)}
              className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
            >
              {fields.map(f => (
                <option key={f.id} value={f.id}>{isRTL ? f.nameAr : f.name} - {f.price} {t('common.currency')}/ساعة</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 text-right">
            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">{t('reservations.formDate')}</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
              />
            </div>

            {/* Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">{t('reservations.formTime')}</label>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full py-3 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-bold"
              >
                <option value="17:00">17:00</option>
                <option value="18:30">18:30</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-right">
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

            {/* Paid Amount */}
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
          <div className="space-y-1.5 text-right">
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
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {method === 'Cash' ? t('reservations.cash') : method === 'Card' ? t('reservations.card') : method === 'CMI' ? t('reservations.cmi') : t('reservations.transfer')}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5 text-right">
            <label className="text-xs font-bold text-slate-500">{t('reservations.notes')}</label>
            <textarea
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
              rows={2}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-extrabold shadow-lg hover:shadow-primary/20 transition-all mt-4"
          >
            {t('common.save')}
          </button>
        </form>
      </Dialog>

      {/* Receipt Ticket Dialog */}
      <Dialog
        isOpen={receiptDialogOpen}
        onClose={() => setReceiptDialogOpen(false)}
        title={t('reservations.detailTitle')}
        size="sm"
      >
        {selectedRes && (
          <div className="space-y-6 text-center text-slate-800 dark:text-slate-200 font-medium">
            {/* Ticket top */}
            <div className="border-b border-dashed border-slate-200 dark:border-slate-700 pb-4">
              <span className="text-3xl">⚽</span>
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-white mt-2">{t('common.appName')} Club</h4>
              <p className="text-xs text-slate-400 mt-0.5">شارع المعاريف، الدار البيضاء</p>
              <p className="text-xs text-slate-400">هاتف: +212 5 22 45 89 63</p>
            </div>

            {/* Ticket details */}
            <div className="space-y-3 text-right text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">رقم الحجز:</span>
                <span className="font-extrabold">{selectedRes.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">الزبون:</span>
                <span className="font-extrabold">{selectedRes.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">الملعب:</span>
                <span className="font-extrabold">{isRTL ? selectedRes.fieldNameAr : selectedRes.fieldName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">التاريخ والوقت:</span>
                <span className="font-extrabold">{selectedRes.date} • {selectedRes.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">المدة:</span>
                <span className="font-extrabold">{selectedRes.duration} {t('common.hours')}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-slate-200 dark:border-slate-700 pt-3 text-sm">
                <span className="text-slate-900 dark:text-white font-extrabold">المبلغ الإجمالي:</span>
                <span className="font-extrabold text-primary">{selectedRes.price} {t('common.currency')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold">المبلغ المدفوع:</span>
                <span className="font-extrabold text-emerald-500">{selectedRes.paidAmount} {t('common.currency')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold">طريقة الدفع:</span>
                <span className="font-extrabold">
                  {selectedRes.paymentMethod === 'Cash' ? t('reservations.cash') : selectedRes.paymentMethod === 'Card' ? t('reservations.card') : selectedRes.paymentMethod === 'CMI' ? t('reservations.cmi') : t('reservations.transfer')}
                </span>
              </div>
            </div>

            {/* Print button */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-hover shadow-md flex items-center justify-center gap-1.5"
              >
                <Printer size={16} />
                <span>{t('common.printReceipt')}</span>
              </button>
              <button
                type="button"
                onClick={() => setReceiptDialogOpen(false)}
                className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
