
# 📚 AI Study Assistant

An AI-powered mobile learning platform built using React Native, Expo, TypeScript, Node.js, Express, MongoDB, and Gemini AI.

The application helps students learn more effectively from their study materials by allowing them to upload PDF notes, generate AI-powered summaries, create quizzes, and chat with their notes using contextual AI responses.

---

# 🚀 Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login using AsyncStorage
* Logout Functionality

---

## 📄 PDF Management

* Upload PDF Notes
* Store Notes in MongoDB
* Extract Text from Uploaded PDFs
* Associate Notes with Individual Users
* Delete Notes

---

## 🤖 AI Features

### AI Summary Generation

Automatically generates concise and student-friendly summaries from uploaded study materials.

### AI Quiz Generator

Creates Multiple Choice Questions (MCQs) from uploaded notes to help students practice and evaluate their understanding.

### AI Chat with Notes

Allows students to ask questions related to their uploaded notes.

Example:

**User:**

> What is Deadlock?

**AI:**

> Deadlock is a situation where multiple processes are waiting for resources held by each other, preventing execution.

The AI only answers based on the uploaded notes.

---

## 📊 Dashboard

* View Total Notes
* Recent Notes
* Quick Navigation
* Personalized User Dashboard

---

# 🏗️ System Architecture

```text
PDF Upload
     ↓
Text Extraction
     ↓
MongoDB Storage
     ↓
Gemini AI
     ↓
Summary / Quiz / Chat
```

---

# 🛠️ Tech Stack

## Frontend

* React Native
* Expo Router
* TypeScript
* NativeWind
* Zustand
* Axios
* React Hook Form
* Zod
* AsyncStorage

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* PDF Parse

## AI

* Google Gemini AI

---

# 📁 Project Structure

## Frontend

```text
mobile
│
├── app
│   ├── (auth)
│   ├── (tabs)
│   ├── note
│   ├── quiz
│   ├── chat
│   └── _layout.tsx
│
├── src
│   ├── components
│   ├── services
│   ├── store
│   ├── hooks
│   ├── utils
│   ├── types
│   └── validations
│
└── assets
```

## Backend

```text
backend
│
├── src
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── models
│   ├── config
│   └── types
│
├── uploads
│
└── server.ts
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start server:

```bash
npm run dev
```

---

# Frontend Setup

Navigate to frontend directory:

```bash
cd mobile
```

Install dependencies:

```bash
npm install
```

Run Expo:

```bash
npx expo start
```

---

# API Endpoints

## Authentication

```http
POST /api/auth/register
```

Register User

```http
POST /api/auth/login
```

Login User

---

## Notes

```http
POST /api/notes
```

Create Note

```http
GET /api/notes
```

Get All Notes

```http
GET /api/notes/:id
```

Get Single Note

```http
DELETE /api/notes/:id
```

Delete Note

---

## PDF Upload

```http
POST /api/upload/pdf
```

Upload PDF and Generate Summary

---

## AI

```http
POST /api/ai/quiz/:noteId
```

Generate Quiz

```http
POST /api/ai/chat/:noteId
```

Chat with Notes

---

# 🔄 Application Flow

```text
Register/Login
        ↓
Home Dashboard
        ↓
Upload PDF
        ↓
Extract Text
        ↓
Generate Summary
        ↓
Store Note
        ↓
View Notes
        ↓
Generate Quiz
        ↓
Chat with Notes
```

---

# 🎯 Key Learnings

This project helped in understanding:

* Mobile App Development with React Native
* Expo Router Navigation
* Zustand State Management
* REST API Design
* JWT Authentication
* MongoDB Data Modeling
* File Upload Handling
* PDF Text Extraction
* AI Integration using Gemini
* Full Stack Application Architecture

---

# 📈 Future Improvements

* Flashcard Generation
* Study Roadmap Generator
* Quiz History Tracking
* Dark Mode
* Search Notes
* Bookmark Notes
* Multi-PDF Chat
* RAG Architecture using Vector Database
* Pinecone / Qdrant Integration
* Source Citation Support

---

# 🏆 Resume Highlights

* Built an AI-powered study assistant using React Native, Node.js, MongoDB, and Gemini AI.
* Implemented PDF upload and text extraction pipeline for educational content.
* Developed AI-generated summaries, quizzes, and contextual note-based chat.
* Designed secure JWT authentication with persistent user sessions.
* Created a scalable full-stack architecture with mobile-first design principles.

---

# 📄 License

This project is intended for educational and portfolio purposes.
Developed by Krishna Bhargava.
