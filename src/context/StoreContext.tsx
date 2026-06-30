import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Customer, Field, Reservation, NotificationItem } from '../data/mockData';
import { 
  INITIAL_CUSTOMERS, INITIAL_FIELDS, INITIAL_RESERVATIONS, INITIAL_NOTIFICATIONS,
  getSavedData, saveData 
} from '../data/mockData';

interface StoreContextProps {
  customers: Customer[];
  fields: Field[];
  reservations: Reservation[];
  notifications: NotificationItem[];
  addReservation: (res: Omit<Reservation, 'id'>) => void;
  updateReservation: (res: Reservation) => void;
  cancelReservation: (id: string) => void;
  deleteReservation: (id: string) => void;
  addCustomer: (cust: Omit<Customer, 'id' | 'reservationsCount' | 'totalSpent' | 'lastBooking'>) => void;
  updateCustomer: (cust: Customer) => void;
  updateFieldStatus: (fieldId: string, status: Field['status']) => void;
  markAllNotificationsRead: () => void;
  addNotification: (type: NotificationItem['type'], fieldId?: string, customerName?: string, amount?: number) => void;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>(() => getSavedData('customers', INITIAL_CUSTOMERS));
  const [fields, setFields] = useState<Field[]>(() => getSavedData('fields', INITIAL_FIELDS));
  const [reservations, setReservations] = useState<Reservation[]>(() => getSavedData('reservations', INITIAL_RESERVATIONS));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getSavedData('notifications', INITIAL_NOTIFICATIONS));

  useEffect(() => { saveData('customers', customers); }, [customers]);
  useEffect(() => { saveData('fields', fields); }, [fields]);
  useEffect(() => { saveData('reservations', reservations); }, [reservations]);
  useEffect(() => { saveData('notifications', notifications); }, [notifications]);

  const addNotification = (type: NotificationItem['type'], fieldId?: string, customerName?: string, amount?: number) => {
    const time = new Date();
    const hh = String(time.getHours()).padStart(2, '0');
    const mm = String(time.getMinutes()).padStart(2, '0');
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      type,
      fieldId,
      customerName,
      amount,
      timestamp: `${hh}:${mm}`,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addReservation = (res: Omit<Reservation, 'id'>) => {
    const id = `r-${Date.now()}`;
    const newRes: Reservation = { ...res, id };
    setReservations(prev => [newRes, ...prev]);

    // Update Customer stats
    setCustomers(prevCust => prevCust.map(c => {
      if (c.id === res.customerId) {
        return {
          ...c,
          reservationsCount: c.reservationsCount + 1,
          totalSpent: c.totalSpent + res.price,
          lastBooking: res.date
        };
      }
      return c;
    }));

    // Update Field Status to Occupied if today's reservation is active (simplified)
    const todayStr = new Date().toISOString().split('T')[0];
    if (res.date === todayStr) {
      setFields(prevFields => prevFields.map(f => {
        if (f.id === res.fieldId) {
          return { ...f, status: 'Occupied' };
        }
        return f;
      }));
    }

    addNotification('booking', res.fieldId, res.customerName, res.price);
  };

  const updateReservation = (res: Reservation) => {
    setReservations(prev => prev.map(r => r.id === res.id ? res : r));
  };

  const cancelReservation = (id: string) => {
    setReservations(prev => prev.map(r => {
      if (r.id === id) {
        addNotification('cancel', r.fieldId, r.customerName);
        return { ...r, status: 'Cancelled' };
      }
      return r;
    }));
  };

  const deleteReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  const addCustomer = (cust: Omit<Customer, 'id' | 'reservationsCount' | 'totalSpent' | 'lastBooking'>) => {
    const id = `c-${Date.now()}`;
    const newCust: Customer = {
      ...cust,
      id,
      reservationsCount: 0,
      totalSpent: 0,
      lastBooking: '-'
    };
    setCustomers(prev => [newCust, ...prev]);
  };

  const updateCustomer = (cust: Customer) => {
    setCustomers(prev => prev.map(c => c.id === cust.id ? cust : c));
  };

  const updateFieldStatus = (fieldId: string, status: Field['status']) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        if (status === 'Maintenance') {
          addNotification('maintenance', fieldId);
        }
        return { ...f, status };
      }
      return f;
    }));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <StoreContext.Provider value={{
      customers, fields, reservations, notifications,
      addReservation, updateReservation, cancelReservation, deleteReservation,
      addCustomer, updateCustomer, updateFieldStatus, markAllNotificationsRead,
      addNotification
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
