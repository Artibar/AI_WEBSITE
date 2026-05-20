# ⚡ AI Website Generator

### *Turn words into websites — instantly.*

**Describe the website you want. Watch it come to life.**

## 🎬 What is this?

**AI Website Generator** is a full-stack MERN application that transforms natural language prompts into fully functional websites — complete with HTML, CSS, and JavaScript — rendered live in a sandboxed iframe, right in your browser.

No coding required. Just describe. Generate. Preview.

> *"A modern portfolio with dark theme, animated hero section, and a contact form"* → Full website in seconds.

---

## ✨ Features

### 🔐 Firebase Authentication
- Email & Password sign-up / login
- One-click **Google OAuth** login
- Persistent session management via Redux
- Protected routes — only authenticated users can generate

### 🤖 AI-Powered Generation
- Natural language → complete website code
- Structured OpenAI API integration
- Generates production-ready **HTML + CSS + JavaScript** in one shot
- Handles layouts, animations, forms, responsive design, and more

### 🖥️ Live Sandboxed Preview
- Generated code renders **instantly** in a secure `<iframe>`
- Sandboxed environment — safe client-side execution
- What you describe is what you see — no deploy step needed

### 📁 Project History
- Every generation saved to **MongoDB**
- Browse and revisit all previous generations
- Full history tied to your authenticated account

### 🛡️ Input Validation
- Schema validation with **Zod** on both client and server
- Clean error handling and user-friendly feedback

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Redux, React Router |
| **Backend** | Node.js, Express |
| **Database** | MongoDB (Mongoose) |
| **Auth** | Firebase (Email/Password + Google OAuth) |
| **AI** | OpenAI API (GPT) |
| **Validation** | Zod |
| **Deployment** | Render |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      React Frontend                      │
│   Redux Store ──► Protected Routes ──► Live Preview     │
│         │                                    │           │
│    Firebase Auth                     Sandboxed iframe   │
└─────────────┬───────────────────────────────────────────┘
              │ REST API
┌─────────────▼───────────────────────────────────────────┐
│                  Node.js + Express Backend               │
│      Zod Validation ──► OpenAI API ──► MongoDB          │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance (local or Atlas)
- Firebase project
- OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-website-generator.git
cd ai-website-generator
```

### 2. Configure environment variables

**Backend** — create `/server/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

**Frontend** — create `/client/.env`:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Install & run

```bash
# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install

# Run both concurrently (from root)
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📂 Project Structure

```
ai-website-generator/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level pages
│   │   ├── store/            # Redux slices & store
│   │   ├── firebase/         # Firebase config & auth helpers
│   │   └── App.jsx
│   └── package.json
│
├── server/                   # Express backend
│   ├── routes/               # API route handlers
│   ├── models/               # Mongoose schemas
│   ├── controllers/          # Business logic
│   ├── middleware/           # Auth & validation middleware
│   ├── schemas/              # Zod validation schemas
│   └── index.js
│
└── README.md
```

---

## 🔮 Roadmap

- [ ] Export generated website as a downloadable `.zip`
- [ ] Public gallery of community-generated sites
- [ ] Edit & regenerate specific sections
- [ ] Template library for quick-start prompts
- [ ] Deploy generated sites to a subdomain with one click

---

## 🙋‍♂️ About This Project

This is a **portfolio project** built to demonstrate full-stack development skills including:

- Integrating third-party AI APIs into production applications
- Secure authentication flows with Firebase
- State management at scale with Redux
- Building safe, sandboxed browser environments
- REST API design with Express and MongoDB
- Schema-first development with Zod

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ as a portfolio project**

[![Live Demo](https://img.shields.io/badge/🌐%20Try%20It%20Live-ai--website--yddy.onrender.com-6C63FF?style=flat-square)](https://ai-website-yddy.onrender.com/)

*If you found this interesting, drop a ⭐ — it helps a lot!*

</div>


<img width="1920" height="1128" alt="Screenshot 2026-05-17 142423" src="https://github.com/user-attachments/assets/08df9e78-c3ee-4b00-a6aa-7f0ff895174e" />
<img width="1920" height="1128" alt="Screenshot 2026-05-17 142342" src="https://github.com/user-attachments/assets/f37426da-0068-4f33-a6b3-97a977513303" />
<img width="1920" height="1128" alt="Screenshot 2026-05-17 142329" src="https://github.com/user-attachments/assets/c70f1c09-78a7-4fd3-bf21-6e575149f716" />
<img width="1920" height="1128" alt="Screenshot 2026-05-17 142310" src="https://github.com/user-attachments/assets/6f186c07-2f6c-4259-80e5-fb8bed7901f7" />
<img width="1920" height="1128" alt="Screenshot 2026-05-14 155534" src="https://github.com/user-attachments/assets/940249cd-8ceb-4db5-a983-186c6a1147e3" />

