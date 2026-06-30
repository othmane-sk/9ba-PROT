export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'VIP' | 'Regular' | 'New' | 'Blacklisted';
  reservationsCount: number;
  totalSpent: number;
  favoriteField: string;
  lastBooking: string;
  notes?: string;
}

export interface Field {
  id: string;
  name: string;
  nameAr: string;
  surface: 'Synthetic' | 'Premium Turf' | 'Covered Synthetic' | 'Covered Turf' | 'Hybrid';
  surfaceAr: string;
  capacity: string;
  price: number;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Cleaning';
  lighting: boolean;
  parking: boolean;
  amenities: string[];
  amenitiesAr: string[];
}

export interface Reservation {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  fieldId: string;
  fieldName: string;
  fieldNameAr: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  duration: number; // in hours (1 or 1.5)
  price: number;
  paidAmount: number;
  paymentMethod: 'Cash' | 'Card' | 'CMI' | 'Transfer';
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
  status: 'Reserved' | 'Completed' | 'Cancelled' | 'Pending';
  notes?: string;
  employee?: string;
}

export interface NotificationItem {
  id: string;
  type: 'booking' | 'cancel' | 'payment' | 'maintenance' | 'system';
  fieldId?: string;
  customerName?: string;
  amount?: number;
  timestamp: string; // HH:MM or date
  read: boolean;
}

// MOROCCAN CUSTOMERS
export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'يوسف بنجلون (Youssef Benjelloun)', phone: '+212661458923', email: 'youssef.benj@gmail.com', status: 'VIP', reservationsCount: 42, totalSpent: 12600, favoriteField: 'Atlas 1', lastBooking: '2026-06-29' },
  { id: 'c2', name: 'حمزة العلمي (Hamza El Alami)', phone: '+212662984512', email: 'hamza.alami@yahoo.fr', status: 'Regular', reservationsCount: 18, totalSpent: 5400, favoriteField: 'Maarif Indoor', lastBooking: '2026-06-30' },
  { id: 'c3', name: 'أمين الشرايبي (Amine Chraibi)', phone: '+212663117495', email: 'amine.chraib@hotmail.com', status: 'VIP', reservationsCount: 31, totalSpent: 10850, favoriteField: 'Sahara Arena', lastBooking: '2026-06-30' },
  { id: 'c4', name: 'عمر التازي (Omar Tazi)', phone: '+212664551234', email: 'o.tazi@gmail.com', status: 'Regular', reservationsCount: 12, totalSpent: 3600, favoriteField: 'Atlas 2', lastBooking: '2026-06-28' },
  { id: 'c5', name: 'أيمن البناني (Aymane Bennani)', phone: '+212671569832', email: 'aymane.bennani@outlook.com', status: 'New', reservationsCount: 2, totalSpent: 600, favoriteField: 'Dakhla', lastBooking: '2026-06-30' },
  { id: 'c6', name: 'زكرياء الفيلالي (Zakaria Filali)', phone: '+212665893245', email: 'z.filali@gmail.com', status: 'Regular', reservationsCount: 15, totalSpent: 4500, favoriteField: 'Atlas 1', lastBooking: '2026-06-27' },
  { id: 'c7', name: 'عثمان المنصوري (Othmane Mansouri)', phone: '+212667332211', email: 'o.mansouri@gmail.com', status: 'VIP', reservationsCount: 29, totalSpent: 8700, favoriteField: 'Anfa Sky', lastBooking: '2026-06-30' },
  { id: 'c8', name: 'أيوب الصديقي (Ayoub Saddiki)', phone: '+212668904532', email: 'ayoub.saddiki@gmail.com', status: 'Blacklisted', reservationsCount: 5, totalSpent: 1500, favoriteField: 'Victory Arena', lastBooking: '2026-06-15', notes: 'يتأخر كثيراً عن الحضور ولا يدفع أحياناً' },
  { id: 'c9', name: 'المهدي الناصري (Mehdi Naciri)', phone: '+212669445566', email: 'm.naciri@outlook.fr', status: 'New', reservationsCount: 1, totalSpent: 350, favoriteField: 'Rif Center', lastBooking: '2026-06-29' },
  { id: 'c10', name: 'أشرف بنيس (Achraf Bennis)', phone: '+212672543298', email: 'a.bennis@gmail.com', status: 'Regular', reservationsCount: 10, totalSpent: 3000, favoriteField: 'Bouregreg', lastBooking: '2026-06-26' }
];

// 10 FOOTBALL FIELDS
export const INITIAL_FIELDS: Field[] = [
  { id: 'f1', name: 'Atlas 1', nameAr: 'أطلس 1', surface: 'Synthetic', surfaceAr: 'عشب صناعي ممتاز', capacity: '5 vs 5', price: 300, status: 'Occupied', lighting: true, parking: true, amenities: ['Bibs', 'Balls', 'Showers'], amenitiesAr: ['قمصان رياضية', 'كرات', 'دوش'] },
  { id: 'f2', name: 'Atlas 2', nameAr: 'أطلس 2', surface: 'Synthetic', surfaceAr: 'عشب صناعي ممتاز', capacity: '5 vs 5', price: 300, status: 'Available', lighting: true, parking: true, amenities: ['Bibs', 'Balls', 'Showers'], amenitiesAr: ['قمصان رياضية', 'كرات', 'دوش'] },
  { id: 'f3', name: 'Dakhla', nameAr: 'الداخلة', surface: 'Synthetic', surfaceAr: 'عشب صناعي عادي', capacity: '5 vs 5', price: 250, status: 'Available', lighting: true, parking: false, amenities: ['Balls'], amenitiesAr: ['كرات'] },
  { id: 'f4', name: 'Sahara Arena', nameAr: 'صحارى أرينا', surface: 'Premium Turf', surfaceAr: 'عشب طبيعي هجين', capacity: '5 vs 5', price: 350, status: 'Occupied', lighting: true, parking: true, amenities: ['Bibs', 'Balls', 'Showers', 'Cafe'], amenitiesAr: ['قمصان رياضية', 'كرات', 'دوش', 'مقهى'] },
  { id: 'f5', name: 'Maarif Indoor', nameAr: 'المعاريف مغطى', surface: 'Covered Synthetic', surfaceAr: 'عشب صناعي مغطى', capacity: '5 vs 5', price: 400, status: 'Maintenance', lighting: true, parking: true, amenities: ['Bibs', 'Balls', 'Showers', 'AC'], amenitiesAr: ['قمصان رياضية', 'كرات', 'دوش', 'مكيف هواء'] },
  { id: 'f6', name: 'Anfa Sky', nameAr: 'أنفا سكاي', surface: 'Covered Turf', surfaceAr: 'عشب مغطى ممتاز', capacity: '5 vs 5', price: 400, status: 'Occupied', lighting: true, parking: true, amenities: ['Bibs', 'Balls', 'Showers', 'Cafe'], amenitiesAr: ['قمصان رياضية', 'كرات', 'دوش', 'مقهى'] },
  { id: 'f7', name: 'Victory Arena', nameAr: 'فيكتوري أرينا', surface: 'Synthetic', surfaceAr: 'عشب صناعي', capacity: '5 vs 5', price: 250, status: 'Cleaning', lighting: true, parking: false, amenities: ['Balls', 'Showers'], amenitiesAr: ['كرات', 'دوش'] },
  { id: 'f8', name: 'Merzouga Sand', nameAr: 'مرزوكة هجين', surface: 'Hybrid', surfaceAr: 'عشب هجين خارجي', capacity: '5 vs 5', price: 300, status: 'Available', lighting: true, parking: true, amenities: ['Bibs', 'Balls'], amenitiesAr: ['قمصان رياضية', 'كرات'] },
  { id: 'f9', name: 'Bouregreg', nameAr: 'أبو رقراق', surface: 'Synthetic', surfaceAr: 'عشب صناعي', capacity: '5 vs 5', price: 250, status: 'Available', lighting: false, parking: true, amenities: ['Balls'], amenitiesAr: ['كرات'] },
  { id: 'f10', name: 'Rif Center', nameAr: 'الريف مغطى', surface: 'Covered Synthetic', surfaceAr: 'عشب صناعي مغطى', capacity: '5 vs 5', price: 350, status: 'Available', lighting: true, parking: true, amenities: ['Bibs', 'Balls', 'Showers'], amenitiesAr: ['قمصان رياضية', 'كرات', 'دوش'] }
];

// RESERVATIONS (Moroccan times: 17:00, 18:30, 20:00, 21:30, 23:00)
export const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 'r1', customerId: 'c1', customerName: 'يوسف بنجلون (Youssef Benjelloun)', customerPhone: '+212661458923', fieldId: 'f1', fieldName: 'Atlas 1', fieldNameAr: 'أطلس 1', date: '2026-06-30', time: '17:00', duration: 1.5, price: 450, paidAmount: 450, paymentMethod: 'Cash', paymentStatus: 'Paid', status: 'Completed', employee: 'رشيد (Receptionist)' },
  { id: 'r2', customerId: 'c2', customerName: 'حمزة العلمي (Hamza El Alami)', customerPhone: '+212662984512', fieldId: 'f2', fieldName: 'Atlas 2', fieldNameAr: 'أطلس 2', date: '2026-06-30', time: '18:30', duration: 1, price: 300, paidAmount: 300, paymentMethod: 'Card', paymentStatus: 'Paid', status: 'Completed', employee: 'رشيد (Receptionist)' },
  { id: 'r3', customerId: 'c3', customerName: 'أمين الشرايبي (Amine Chraibi)', customerPhone: '+212663117495', fieldId: 'f4', fieldName: 'Sahara Arena', fieldNameAr: 'صحارى أرينا', date: '2026-06-30', time: '20:00', duration: 1.5, price: 525, paidAmount: 200, paymentMethod: 'CMI', paymentStatus: 'Partial', status: 'Reserved', employee: 'حمزة (Admin)' },
  { id: 'r4', customerId: 'c7', customerName: 'عثمان المنصوري (Othmane Mansouri)', customerPhone: '+212667332211', fieldId: 'f6', fieldName: 'Anfa Sky', fieldNameAr: 'أنفا سكاي', date: '2026-06-30', time: '21:30', duration: 1.5, price: 600, paidAmount: 0, paymentMethod: 'Cash', paymentStatus: 'Unpaid', status: 'Reserved', employee: 'رشيد (Receptionist)' },
  { id: 'r5', customerId: 'c5', customerName: 'أيمن البناني (Aymane Bennani)', customerPhone: '+212671569832', fieldId: 'f3', fieldName: 'Dakhla', fieldNameAr: 'الداخلة', date: '2026-06-30', time: '23:00', duration: 1, price: 250, paidAmount: 250, paymentMethod: 'Transfer', paymentStatus: 'Paid', status: 'Pending', employee: 'حمزة (Admin)' },
  { id: 'r6', customerId: 'c4', customerName: 'عمر التازي (Omar Tazi)', customerPhone: '+212664551234', fieldId: 'f1', fieldName: 'Atlas 1', fieldNameAr: 'أطلس 1', date: '2026-06-30', time: '20:00', duration: 1.5, price: 450, paidAmount: 450, paymentMethod: 'Cash', paymentStatus: 'Paid', status: 'Reserved', employee: 'رشيد (Receptionist)' },
  // Tomorrow's bookings
  { id: 'r7', customerId: 'c6', customerName: 'زكرياء الفيلالي (Zakaria Filali)', customerPhone: '+212665893245', fieldId: 'f1', fieldName: 'Atlas 1', fieldNameAr: 'أطلس 1', date: '2026-07-01', time: '18:30', duration: 1, price: 300, paidAmount: 0, paymentMethod: 'Cash', paymentStatus: 'Unpaid', status: 'Reserved', employee: 'حمزة (Admin)' },
  { id: 'r8', customerId: 'c2', customerName: 'حمزة العلمي (Hamza El Alami)', customerPhone: '+212662984512', fieldId: 'f4', fieldName: 'Sahara Arena', fieldNameAr: 'صحارى أرينا', date: '2026-07-01', time: '20:00', duration: 1.5, price: 525, paidAmount: 525, paymentMethod: 'Card', paymentStatus: 'Paid', status: 'Reserved', employee: 'رشيد (Receptionist)' }
];

// NOTIFICATIONS
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', type: 'booking', fieldId: 'f4', customerName: 'أمين الشرايبي', amount: 525, timestamp: '19:42', read: false },
  { id: 'n2', type: 'payment', fieldId: 'f1', customerName: 'يوسف بنجلون', amount: 450, timestamp: '18:15', read: false },
  { id: 'n3', type: 'cancel', fieldId: 'f8', customerName: 'أشرف بنيس', timestamp: '16:05', read: true },
  { id: 'n4', type: 'maintenance', fieldId: 'f5', timestamp: '12:00', read: true }
];

// PERSISTENCE HELPERS
export function getSavedData<T>(key: string, initial: T): T {
  const data = localStorage.getItem(`9oba_${key}`);
  return data ? JSON.parse(data) : initial;
}

export function saveData<T>(key: string, value: T): void {
  localStorage.setItem(`9oba_${key}`, JSON.stringify(value));
}
