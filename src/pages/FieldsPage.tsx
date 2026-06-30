import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../hooks/useLanguage';
import { Dialog } from '../components/Dialog';
import { Edit3, Wifi } from 'lucide-react';
import type { Field } from '../data/mockData';

export const FieldsPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { fields, updateFieldStatus } = useStore();

  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

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

  const handleOpenStatusDialog = (field: Field) => {
    setSelectedField(field);
    setStatusDialogOpen(true);
  };

  const handleUpdateStatus = (status: Field['status']) => {
    if (!selectedField) return;
    updateFieldStatus(selectedField.id, status);
    setStatusDialogOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{t('fields.title')}</h2>
        <p className="text-xs text-slate-400 font-medium">{t('fields.subtitle')}</p>
      </div>

      {/* Grid listing fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <div 
            key={field.id}
            className="bg-white dark:bg-slate-900 rounded-[20px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-200"
          >
            {/* Upper area with visual block */}
            <div className="h-32 bg-gradient-to-tr from-emerald-500/20 to-primary/20 p-5 flex flex-col justify-between relative">
              <span className="text-xs font-extrabold text-primary dark:text-emerald-300 bg-white dark:bg-slate-900/60 w-fit px-2.5 py-1 rounded-full shadow-sm">
                {t('fields.fieldNum')} {field.id.replace('f', '')}
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {isRTL ? field.nameAr : field.name}
                </h3>
                <p className="text-[10px] text-slate-500 font-bold">{isRTL ? field.surfaceAr : field.surface}</p>
              </div>
            </div>

            {/* Field Details */}
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center text-xs border-b border-slate-50 dark:border-slate-800 pb-3">
                <span className="text-slate-400 font-bold">{t('common.status')}</span>
                <span className={`px-2.5 py-0.5 font-bold rounded-full border ${getStatusColor(field.status)}`}>
                  {getStatusLabel(field.status)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs border-b border-slate-50 dark:border-slate-800 pb-3">
                <span className="text-slate-400 font-bold">{t('fields.capacity')}</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-200">{field.capacity}</span>
              </div>

              <div className="flex justify-between items-center text-xs border-b border-slate-50 dark:border-slate-800 pb-3">
                <span className="text-slate-400 font-bold">{t('common.price')}</span>
                <span className="font-extrabold text-primary">{field.price} {t('fields.priceHour')}</span>
              </div>

              {/* Amenities tags */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 block">{t('fields.amenities')}</span>
                <div className="flex flex-wrap gap-1.5">
                  {(isRTL ? field.amenitiesAr : field.amenities).map((a, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-[9px] font-bold">
                      {a}
                    </span>
                  ))}
                  {field.lighting && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[9px] font-bold flex items-center gap-0.5">
                      <Wifi size={8} />
                      <span>{t('fields.lighting')}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer with actions */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex gap-2">
              <button
                onClick={() => handleOpenStatusDialog(field)}
                className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Edit3 size={14} />
                <span>تعديل الحالة</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog for Quick Status Update */}
      <Dialog
        isOpen={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        title={selectedField ? `${t('fields.editField')} - ${isRTL ? selectedField.nameAr : selectedField.name}` : ''}
        size="sm"
      >
        {selectedField && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 text-right mb-4">اختر الحالة التشغيلية للملعب ليتم تعميمها في لوحة التحكم والجدول الزمني:</p>
            <div className="grid grid-cols-2 gap-3 text-right">
              {(['Available', 'Occupied', 'Maintenance', 'Cleaning'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(status)}
                  className={`p-4 rounded-xl border text-xs font-bold text-center transition-all ${
                    selectedField.status === status
                      ? 'bg-primary/10 text-primary border-primary ring-2 ring-primary/20'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="block text-sm mb-1">
                    {status === 'Available' ? '⚽' : status === 'Occupied' ? '🏃' : status === 'Maintenance' ? '🔧' : '🧹'}
                  </span>
                  <span>{getStatusLabel(status)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
