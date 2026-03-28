# TechStore E-Commerce Platform

TechStore is a professional, full-featured e-commerce storefront designed for a premium shopping experience. Built with a modern tech stack, it features a sleek, full-width interface, dynamic product categories, and a robust backend for managing inventory and customer feedback.

![TechStore Banner](https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Features

### **🎨 UI/UX Excellence**
- **TechStore Branding**: A professional, dark-navy and gold aesthetic inspired by modern enterprise retail.
- **Full-Width Responsive Design**: Optimized for all screen sizes, utilizing 100% of the viewport.
- **Dark & Light Mode**: Seamless theme toggling with persistent user preference.
- **Custom Modals**: Interactive UI-based modals for cart confirmations and duplicate item alerts.

### **📦 Catalog & Discovery**
- **Dynamic Categories**: specialized sections for **Hardware**, **Software**, and **Firmware**.
- **Smart Filtering**: Reorder products by **Price (Low/High)**, **Average Rating**, or **Popularity**.
- **Hero Banners**: Auto-switching banners highlighting top-selling and featured deals.
- **Deep Search**: Functional search bar for quick discovery across the entire inventory.

### **🛒 Cart & Checkout**
- **Quantity Management**: Full control over item quantities directly from the cart.
- **Duplicate Prevention**: Intelligently handles existing items and notifies users via custom UI alerts.
- **Zero-Accident Deletion**: Integrated confirmation safeguards before item removal.

### **⭐ Customer Feedback**
- **Persistent Reviews**: Integrated database model for saving and viewing user experiences.
- **Real-Time Ratings**: Automatic recalculation of product average scores upon review submission.
- **TechStore Verified**: Badges for verified reviews and "Tech Prime" shipping.

---

## 🛠️ Technology Stack

### **Frontend**
- **React 18** + **Vite** (Next-gen bundling)
- **Zustand** (State management)
- **React Router Dom** (Dynamic routing)
- **Lucide React** (Premium iconography)
- **Vanilla CSS3** (Custom design system)

### **Backend**
- **Node.js** & **Express** (API infrastructure)
- **Prisma ORM** (Database management)
- **SQLite** (Initial local database)
- **TypeScript** (Robust type safety)

---

## ⚙️ Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/techstore.git
   cd techstore
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   npx prisma migrate dev --name init
   npx ts-node-esm prisma/seed.ts
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```bash
TechStore/
├── backend/            # Express API & Prisma Database
│   ├── prisma/         # Schema & Seed data
│   ├── routes/         # API Endpoint definitions
│   ├── controllers/    # Business logic
│   └── services/       # Database interactions
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI pieces (Modals, Navbar, etc.)
│   │   ├── pages/      # Full-page views
│   │   ├── store/      # Zustand cart state
│   │   └── hooks/      # Custom React hooks (Theme, Search)
│   └── App.css         # Global TechStore Design System
└── .gitignore          # Production exclusions
```

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Developed with ❤️ as part of the TechStore Enterprise Project.*
