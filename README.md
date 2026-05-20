# ⚡ AI Website Generator

### *Turn words into websites — instantly.*

**Describe the website you want. Watch it come to life.**

## 🎬 What is this?

**AI Website Generator** is a full-stack MERN application that transforms natural language prompts into fully functional websites — complete with HTML, CSS, and JavaScript — rendered live in a sandboxed iframe, right in your browser.

No coding required. Just describe. Generate. Preview.

> *"A modern portfolio with dark theme, animated hero section, and a contact form"* → Full website in seconds.

---

## ✨ Features

LIVELINK: https://ai-website-yddy.onrender.com

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

The app will be available at [`http://localhost:5173`](https://ai-website-yddy.onrender.com/)


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


<img width="1891" height="1003" alt="Screenshot 2026-05-20 151347" src="https://github.com/user-attachments/assets/d481fdef-7c5f-48cc-96e6-107cf53aa3f1" />
<img width="1909" height="1008" alt="Screenshot 2026-05-20 151323" src="https://github.com/user-attachments/assets/f282abc3-28f2-4cf7-86cc-348b612110fa" />
<img width="1891" height="1003" alt="Screenshot 2026-05-20 151217" src="https://github.com/user-attachments/assets/89b8db7a-202b-4a7b-9b44-d3bc6fe0d2fa" />
<img width="1889" height="1001" alt="Screenshot 2026-05-20 151150" src="https://github.com/user-attachments/assets/00914d6c-18fe-4f6c-a2f6-6254b85fd085" />
<img width="1892" height="1002" alt="Screenshot 2026-05-20 134927" src="https://github.com/user-attachments/assets/529cac5d-99a9-4da8-bdc7-37319e88f4ae" />
<img width="1892" height="1008" alt="Screenshot 2026-05-20 134906" src="https://github.com/user-attachments/assets/0470ac28-f9d5-43b4-8b2a-fe675df4ff10" />


