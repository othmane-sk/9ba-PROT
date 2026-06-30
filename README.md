# ⚽ 9oba | Soccer Club Management System

**9oba** (Moroccan Arabic: *قبة* - referencing covered fields or stadium arenas) is a premium SaaS frontend dashboard prototype designed specifically to convince football club owners in Morocco to digitize their business, replacing traditional pen-and-paper reservation processes with a sleek, automated platform.

---

## 🎨 Visual Identity & Key Highlights
* **Apple & Stripe Inspired Aesthetics**: Generous white space, soft shadows, clean grid systems, and subtle interactive micro-animations.
* **Fully Localized Moroccan Experience**:
  * Default **Arabic (RTL)** interface with the beautiful **Tajawal & Cairo** typography.
  * **French (LTR)** switch support.
  * Instant, no-refresh language and direction layout mirroring.
  * Local currency: **MAD / DH**.
  * Moroccan mock data (names, phone numbers, schedules, payment channels like CMI).

---

## 🛠️ Tech Stack
* **Vite + React + TypeScript** for performance and strict typing.
* **TailwindCSS v4** for custom themes and modern utility styles.
* **React Router (HashRouter)** for seamless client routing.
* **Recharts** for animated financial and occupancy analytics.
* **Lucide React** for clean, consistent UI iconography.
* **Framer Motion** for elegant card lifts, modal fade-ins, and page transitions.

---

## 📂 Project Structure
```text
src/
├── assets/         # Project images and icons
├── components/     # Reusable UI widgets (Dialog, LanguageSwitch, ThemeToggle)
├── context/        # Persisted state container (StoreContext)
├── data/           # Moroccan mock dataset and helper functions
├── hooks/          # Custom react hooks (useLanguage, useTheme)
├── i18n/           # Translation dictionaries (ar.json, fr.json)
├── layout/         # Shell layouts (MainLayout)
├── pages/          # Complete SaaS screens
└── styles/         # Global themes and CSS
```

---

## 🚀 Getting Started & Local Run

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run in Development Mode**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 💎 Future Integration Path
This frontend was architected with a modular, action-based store provider. When transitioning from mock data to a production backend (Node.js/Django/Laravel):
1. Replace state-updating functions in `src/context/StoreContext.tsx` with async axios/fetch API calls.
2. Hook user settings and notifications to websockets for real-time manager alerts.
