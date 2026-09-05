````md
# 🚀 NexaAI - Intelligent AI Assistant

NexaAI is a full-stack AI-powered assistant built using the **MERN Stack** with intelligent chat, AI image generation, secure authentication, Stripe subscriptions, and a community image-sharing system.

Designed to provide a modern AI experience with persistent chat functionality and a clean user interface.

## 🌐 Live Demo

### 🔗 Live Application
Frontend: https://nexaai-two.vercel.app/

### ⚙️ Backend API
Backend: https://nexaai-mern-server.vercel.app/

### 💻 GitHub Repository
Repository: https://github.com/Priyanshu-1705/nexaai-mern.git

---

## ✨ Features

### 🔐 Authentication System
- JWT-based secure authentication
- Login & Signup functionality
- Protected routes

### 💬 AI Chat Assistant
- AI-powered text responses
- Persistent chat history
- Multiple chat sessions
- Smart conversational interface

### 🎨 AI Image Generation
- Generate AI images using prompts
- Store generated images
- Publish generated images to community

### 🌍 Community Images
- Browse publicly shared AI-generated images
- Interactive image gallery
- Community-driven content

### 💳 Credit-Based Subscription System
- Stripe payment integration
- Multiple credit plans
- Automatic credit updates
- Secure webhook implementation

### 🌙 Modern UI/UX
- Responsive design
- Dark mode support
- Smooth user experience
- Clean and modern interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### AI & Third-Party Services
- Gemini API
- Stripe Payment Gateway
- ImageKit (Image Storage & AI Image Generation)

### Deployment
- Vercel

---

## 📂 Project Structure

```bash
nexaai-mern/
│── client/
│   ├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── assets/
│
│── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── configs/
│
│── screenshots/
│── README.md
````

---

## 📸 Screenshots

### 🏠 Home Page

<img width="2556" height="1303" alt="image" src="https://github.com/user-attachments/assets/7dd2d97a-4fa6-4fea-b2ca-30207d7a7db0" />


### 💬 Chat Interface

<img width="2554" height="1309" alt="image" src="https://github.com/user-attachments/assets/6c888c7b-a8f2-4037-82f5-5d41d2269b19" />


### 💳 Credit Plans

<img width="2557" height="1306" alt="image" src="https://github.com/user-attachments/assets/fa256236-e628-40c6-9733-b9612a7e5bf8" />


### 💰 Payment Integration

<img width="2539" height="1309" alt="image" src="https://github.com/user-attachments/assets/a1d40ca3-c173-444b-922f-7d7a3813a68c" />


### 🔐 Login Page

<img width="2557" height="1315" alt="image" src="https://github.com/user-attachments/assets/30805c07-888e-4609-8201-2710b6a804bb" />

<img width="2557" height="1309" alt="image" src="https://github.com/user-attachments/assets/97c10f16-4b11-41c0-bb00-7e417e2e27ce" />



---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Priyanshu-1705/nexaai-mern.git
cd nexaai-mern
```

### 2️⃣ Install Dependencies

#### Frontend Setup

```bash
cd client
npm install
```

#### Backend Setup

```bash
cd server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **server** folder:

```env
MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

# Stripe
STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Client URL
CLIENT_URL=http://localhost:5173

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
```

---

## ▶️ Run Project Locally

### Start Backend

```bash
cd server
npm run server
```

### Start Frontend

```bash
cd client
npm run dev
```

Open:

```txt
http://localhost:5173
```

---

## 💳 Stripe Test Card

Use this Stripe test card:

```txt
4242 4242 4242 4242
```

**Expiry Date:** Any future date
**CVV:** Any 3 digits

---

## 🚀 Deployment

### Frontend Deployment

Deployed on **Vercel**

### Backend Deployment

Deployed on **Vercel**

Remember to add all environment variables inside the Vercel dashboard.

---

## 🔮 Future Improvements

* Voice-enabled AI assistant
* Better AI image generation support
* Export chat functionality
* Search in chat history
* Premium AI models
* Performance optimization

---

## 👨‍💻 Author

**Priyanshu Gangwar**
BTech CSE Student | MERN Stack Developer | Aspiring Software Engineer

### Connect with Me

GitHub: https://github.com/Priyanshu-1705

LinkedIn: https://www.linkedin.com/in/priyanshu-gangwar-746520295

---

## ⭐ Support

If you liked this project, consider giving it a **Star ⭐** on GitHub.

```
```
