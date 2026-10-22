<div align="center">

<h1>💬 Chatify</h1>

<p><strong>A modern, real-time full-stack chat application built with the MERN stack and Socket.IO</strong></p>

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

<br/>

![Chatify Screenshot](./frontend/public/screenshot-for-readme.png)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Real-Time Events](#-real-time-events)
- [Security](#-security)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Chatify** is a full-stack, real-time messaging application that allows users to send and receive messages instantly. It features a sleek dark UI with glassmorphism effects, JWT-based authentication, profile picture uploads via Cloudinary, email notifications via Resend, and rate-limiting / bot protection powered by Arcjet.

Whether deployed on a cloud platform like **Render** or run locally, Chatify is designed to be both developer-friendly and production-ready.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure signup / login / logout with JWT stored in HTTP-only cookies |
| 💬 **Real-Time Messaging** | Instant bi-directional messaging powered by Socket.IO |
| 👤 **Profile Management** | Update profile picture (uploaded to Cloudinary) and change password |
| 🟢 **Online Presence** | Live online/offline user status indicators |
| 📋 **Contacts & Chats** | Browse all users or view existing chat partners |
| 🔔 **Notifications** | In-app toast notifications + email notifications via Resend |
| 🛡️ **Rate Limiting** | API protection with Arcjet (bot detection, rate limiting) |
| 🖼️ **Image Messages** | Send images alongside text in conversations |
| 🎵 **Sound Effects** | Keyboard sounds and notification sounds for an immersive experience |
| 📱 **Responsive Design** | Fully responsive layout for desktop and mobile |

---

## 🛠 Tech Stack

### Backend

| Package | Version | Purpose |
|---|---|---|
| [Express.js](https://expressjs.com) | ^4.21 | HTTP server & REST API |
| [Mongoose](https://mongoosejs.com) | ^8.10 | MongoDB ODM |
| [Socket.IO](https://socket.io) | ^4.8 | Real-time WebSocket communication |
| [JSON Web Token](https://github.com/auth0/node-jsonwebtoken) | ^9.0 | Authentication tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | ^2.4 | Password hashing |
| [Cloudinary](https://cloudinary.com) | ^2.9 | Image storage & delivery |
| [Resend](https://resend.com) | ^6.9 | Transactional email sending |
| [Arcjet](https://arcjet.com) | ^1.3 | Bot protection & rate limiting |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | ^1.4 | Cookie parsing middleware |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.3 | Environment variable loading |

### Frontend

| Package | Version | Purpose |
|---|---|---|
| [React](https://reactjs.org) | ^19.2 | UI library |
| [Vite](https://vitejs.dev) | ^7.3 | Frontend build tool & dev server |
| [React Router DOM](https://reactrouter.com) | ^7.13 | Client-side routing |
| [Zustand](https://zustand-demo.pmnd.rs) | ^5.0 | Global state management |
| [Socket.IO Client](https://socket.io) | ^4.8 | WebSocket client |
| [Axios](https://axios-http.com) | ^1.13 | HTTP client |
| [TailwindCSS](https://tailwindcss.com) | ^4.2 | Utility-first CSS framework |
| [DaisyUI](https://daisyui.com) | ^5.5 | Tailwind component library |
| [Lucide React](https://lucide.dev) | ^0.577 | Icon library |
| [React Hot Toast](https://react-hot-toast.com) | ^2.6 | Toast notifications |

---

## 📁 Project Structure

```
CHATIFY_APP/
├── backend/                            # Express + Socket.IO API server
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # Signup, login, logout, profile, password
│   │   │   └── message.controller.js   # Send & fetch messages, contacts, chats
│   │   ├── emails/
│   │   │   ├── emailHandlers.js        # Email trigger logic
│   │   │   └── emailTemplates.js       # HTML email templates
│   │   ├── lib/
│   │   │   ├── arcjet.js               # Arcjet client setup
│   │   │   ├── cloudinary.js           # Cloudinary SDK config
│   │   │   ├── db.js                   # MongoDB connection
│   │   │   ├── env.js                  # Validated environment variables
│   │   │   ├── resend.js               # Resend email client
│   │   │   ├── socket.js               # Socket.IO server + online-user map
│   │   │   └── utils.js                # Shared utilities (JWT generation, etc.)
│   │   ├── middleware/
│   │   │   ├── arcjet.middleware.js     # Rate-limit / bot-protection guard
│   │   │   ├── auth.middleware.js       # HTTP JWT auth guard
│   │   │   └── socket.auth.middleware.js # Socket.IO JWT auth guard
│   │   ├── models/
│   │   │   ├── Message.js              # Message Mongoose schema
│   │   │   └── User.js                 # User Mongoose schema
│   │   ├── routes/
│   │   │   ├── auth.route.js           # /api/auth routes
│   │   │   └── message.route.js        # /api/messages routes
│   │   └── server.js                   # App entry point
│   ├── .env                            # Your local environment (git-ignored)
│   ├── .env.example                    # Environment variable template
│   └── package.json
│
└── frontend/                           # React + Vite SPA
    ├── public/
    │   ├── sounds/                     # UI sound effect files (.mp3)
    │   └── *.png                       # Static image assets
    ├── src/
    │   ├── components/                 # Reusable UI components
    │   │   ├── ChatContainer.jsx
    │   │   ├── ChatHeader.jsx
    │   │   ├── ChatsList.jsx
    │   │   ├── ContactList.jsx
    │   │   ├── MessageInput.jsx
    │   │   └── ...
    │   ├── config/
    │   │   └── api.js                  # Axios base URL configuration
    │   ├── hooks/
    │   │   └── useKeyboardSound.js     # Custom hook for keyboard sound effects
    │   ├── lib/
    │   │   └── axios.js                # Pre-configured Axios instance
    │   ├── pages/
    │   │   ├── ChatPage.jsx            # Main chat interface
    │   │   ├── LoginPage.jsx           # Login page
    │   │   └── SignUpPage.jsx          # Signup page
    │   ├── store/
    │   │   ├── useAuthStore.js         # Auth state (Zustand)
    │   │   └── useChatStore.js         # Chat / message state (Zustand)
    │   ├── App.jsx                     # Root component with routing guards
    │   ├── main.jsx                    # React DOM entry point
    │   └── index.css                   # Global styles & Tailwind directives
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed and configured:

- **[Node.js](https://nodejs.org) v18+** and **npm v9+**
- A **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** cluster (or local MongoDB instance)
- A **[Cloudinary](https://cloudinary.com)** account — for profile picture / image uploads
- A **[Resend](https://resend.com)** account — for transactional emails
- An **[Arcjet](https://arcjet.com)** account — for rate limiting & bot protection

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/chatify-app.git
cd chatify-app/CHATIFY_APP
```

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Install frontend dependencies**

```bash
cd ../frontend
npm install
```

---

### Environment Variables

Copy the example file into a real `.env` file and populate it with your credentials:

```bash
cd backend
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Port the server listens on (default: `3000`) |
| `MONGODB_URI` | ✅ | Full MongoDB connection string |
| `NODE_ENV` | No | `development` or `production` |
| `SERVE_FRONTEND` | No | `true` to serve the built React app from the backend |
| `CLIENT_URL` | ✅ | Frontend origin URL (e.g. `http://localhost:5173`) |
| `CLIENT_URLS` | No | Comma-separated list of additional allowed CORS origins |
| `JWT_SECRET` | ✅ | Secret key used to sign JWT tokens |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | Your Cloudinary API secret |
| `RESEND_API_KEY` | ✅ | Your Resend API key |
| `EMAIL_FROM` | No | Sender email address (default: `onboarding@resend.dev`) |
| `EMAIL_FROM_NAME` | No | Sender display name |
| `EMAIL_TEST_TO` | No | Recipient email for test sends |
| `ARCJET_KEY` | ✅ | Your Arcjet API key |
| `ARCJET_ENV` | No | `development` or `production` |

> **⚠️ Warning:** Never commit your `.env` file. It is already listed in `.gitignore`.

---

### Running the App

#### Development (two terminals)

```bash
# Terminal 1 — Backend
cd backend
npm run dev      # Starts nodemon on http://localhost:3000

# Terminal 2 — Frontend
cd frontend
npm run dev      # Starts Vite dev server on http://localhost:5173
```

#### Production (single server)

```bash
# Step 1: Build the React frontend
cd frontend
npm run build

# Step 2: Start the backend — it serves the built frontend automatically
cd ../backend
NODE_ENV=production SERVE_FRONTEND=true npm start
```

> With `SERVE_FRONTEND=true` and `NODE_ENV=production`, the backend serves the React SPA from `frontend/dist/` and handles client-side routing via a catch-all route — no separate frontend server required.

---

## 📡 API Reference

All REST endpoints are prefixed with `/api`. Protected routes (✅) require a valid JWT session cookie.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/signup` | ❌ | Register a new user account |
| `POST` | `/login` | ❌ | Authenticate and receive a JWT cookie |
| `POST` | `/logout` | ❌ | Invalidate the JWT cookie |
| `GET` | `/check` | ✅ | Verify the current auth session |
| `PUT` | `/update-profile` | ✅ | Upload and update profile picture |
| `PUT` | `/change-password` | ✅ | Change the account password |

### Messages — `/api/messages`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/contacts` | ✅ | Get all registered users (contact list) |
| `GET` | `/chats` | ✅ | Get users you have an existing chat with |
| `GET` | `/:id` | ✅ | Retrieve full message history with a user |
| `POST` | `/send/:id` | ✅ | Send a text or image message to a user |

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Returns `{ "status": "ok" }` when the server is running |

---

## ⚡ Real-Time Events

Chatify uses **Socket.IO** for bi-directional real-time communication. All socket connections are authenticated via a JWT middleware before any events are processed.

| Event | Direction | Payload | Description |
|---|---|---|---|
| `getOnlineUsers` | Server → All Clients | `string[]` (user IDs) | Broadcast whenever a user connects or disconnects |
| `newMessage` | Server → Recipient | `Message` object | Delivers a new message to the intended recipient instantly |
| `disconnect` | Client → Server | — | Removes user from the online map and re-broadcasts presence |

---

## 🔒 Security

Chatify implements multiple layers of security out of the box:

- **HTTP-only JWT Cookies** — Tokens are never accessible from JavaScript, preventing XSS token theft
- **Password Hashing** — All passwords are hashed with `bcryptjs` (salt rounds ≥ 10) before persistence
- **Arcjet Middleware** — Every API route is guarded by rate limiting and bot-detection rules
- **Socket.IO Auth Guard** — WebSocket connections are verified with JWT before any event is processed
- **CORS Whitelist** — Only explicitly configured origins are permitted for cross-origin requests
- **10 MB Body Limit** — Express body parser is capped to prevent oversized payload attacks

---

## ☁️ Deployment

Chatify is optimised for one-click deployment on **[Render](https://render.com)**.

### Steps

1. Push your code to a GitHub repository.
2. Create a new **Web Service** on Render and connect your repo.
3. Set **Root Directory** → `CHATIFY_APP/backend`
4. Set **Build Command**:
   ```bash
   cd ../frontend && npm install && npm run build && cd ../backend && npm install
   ```
5. Set **Start Command**:
   ```bash
   npm start
   ```
6. Add all environment variables from your `.env` in the Render dashboard.
7. Set `NODE_ENV=production` and `SERVE_FRONTEND=true`.

> Render automatically injects the `RENDER_EXTERNAL_URL` environment variable. Chatify's CORS configuration reads this variable and allows requests from the deployed URL without any extra setup.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes using [Conventional Commits](https://www.conventionalcommits.org):
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request against `main`

Before submitting, make sure your code passes the linter:

```bash
cd frontend
npm run lint
```

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for more information.

---

<div align="center">

Made with ❤️ using the MERN Stack & Socket.IO

⭐ **If you found this project useful, please give it a star!** ⭐

</div>
