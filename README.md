# 🌱 Carbon Tracker – Sustainable Lifestyle Analyzer  

### 🚀 Overview  
**Carbon Tracker** is a full-stack web application that helps users calculate, monitor, and reduce their carbon footprint.  
It provides personalized insights and recommendations based on user activities such as transportation, diet, and electricity usage — empowering individuals to make eco-friendly lifestyle decisions.  

Built using **React**, **Node.js**, **Express**, and **Firebase**, this project demonstrates scalable architecture, real-time data storage, and intelligent insights through data-driven algorithms (ready for ML integration).  

---

## 🧠 Features  

✅ **Carbon Footprint Calculator** – Calculates footprint using scientifically derived formulas.  
✅ **Personalized Insights (ML-ready)** – Generates suggestions based on user history and patterns.  
✅ **User Dashboard** – Displays daily, monthly, and category-wise emissions.  
✅ **Firestore Integration** – Real-time cloud storage for user data.  
✅ **History Management** – View or clear past data directly from the interface.  
✅ **Modern UI** – Built with React and Tailwind CSS for a responsive, clean experience.  

---

## ⚙️ Tech Stack  

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | Firebase Firestore |
| Authentication | Firebase Auth (optional) |
| Deployment | GitHub Pages / Render / Vercel |
| Optional ML | Python API / TensorFlow model for predictive insights |

---

## 🏗️ System Architecture  

```text
 ┌───────────────────────┐        ┌─────────────────────────┐
 │       React Frontend  │◄──────►│ Node.js + Express API   │
 │ (User Input + Display)│        │   (Business Logic)      │
 └───────────────────────┘        └──────────┬──────────────┘
                                             │
                                     ┌───────▼────────┐
                                     │ Firebase Cloud │
                                     │ Firestore DB   │
                                     └────────────────┘
```

---

## 📊 Dataset (Optional ML Extension)  
When extended with Machine Learning, anonymized user data can be used to:  
- Predict future footprint trends  
- Cluster users based on lifestyle habits  
- Recommend optimized sustainability goals  

---

## 🧩 Folder Structure  

```
carbon-tracker/
├── carbon-tracker-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── Calculator.js
│   └── package.json
│
├── carbon-tracker-backend/
│   ├── server.js
│   ├── routes/
│   ├── firebaseConfig.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/<your-username>/carbon-tracker.git
cd carbon-tracker
```

### 2️⃣ Backend setup  
```bash
cd carbon-tracker-backend
npm install
npm start
```

### 3️⃣ Frontend setup  
```bash
cd carbon-tracker-frontend
npm install
npm start
```

App runs at 👉 **http://localhost:3000**  
Backend runs at 👉 **http://localhost:5000**

---

## 🔒 Firebase Configuration  

In `firebaseConfig.js`:
```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

---

## 🌍 Future Enhancements  

- 🌿 AI-based personalized recommendations  
- 📈 Predictive analytics dashboard  
- 📲 Mobile app version  
- 🛰️ Integration with IoT or smart devices  
- 🧾 Carbon offset tracking via green credits  

---

## 🧾 License  
This project is licensed under the **MIT License** — free to use and modify with attribution.  

---

## 💡 Author  
👤 **Akhilesh Gainaboina**  
🔗 [LinkedIn](https://www.linkedin.com/) | [GitHub](https://github.com/akhilesh-z)
