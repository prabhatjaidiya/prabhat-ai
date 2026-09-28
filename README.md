# 🤖 Prabhat AI

> A personal AI agent designed to understand my career background, projects, skills, learning journey, and professional work — and answer questions about me using my own knowledge base.

## 🚧 Project Status

**Currently in development**

Prabhat AI is being built as a 28-day full-stack AI project.

**Current Progress:** 4/28 days completed — **14.29%**

---

## 🎯 Project Goal

The goal of Prabhat AI is to build a personal AI agent that can represent my professional and learning journey.

It will eventually be able to answer questions such as:

* Who am I?
* What technologies do I know?
* What am I currently learning?
* What projects have I built?
* What technologies were used in my projects?
* What is my development experience?
* What are my current learning goals?
* What work have I completed?
* Questions about my portfolio and professional background

The agent will eventually use my own structured knowledge and a **RAG (Retrieval-Augmented Generation)** pipeline to provide context-aware responses.

---

## ✨ Planned Features

### 👤 Personal Profile

* Career background
* Technical skills
* Education
* Learning journey
* Professional experience

### 💻 Project Knowledge

* Project descriptions
* Technologies used
* Features
* Development progress
* Technical decisions

### 📚 Learning Knowledge

* Technologies currently being learned
* Learning progress
* Notes and concepts
* Development roadmap

### 🤖 AI Assistant

* Natural language conversations
* Context-aware responses
* Personal knowledge retrieval
* AI-powered answers based on my information

### 🔎 RAG Pipeline

* Knowledge ingestion
* Document processing
* Embeddings
* Vector search
* Relevant context retrieval
* AI-generated responses

> These AI/RAG features are planned for later stages of development.

---

## 🏗️ Planned Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
Express API
 │
 ▼
Controller
 │
 ▼
AI Service
 │
 ├──► Knowledge Retrieval
 │
 ├──► RAG Pipeline
 │
 └──► AI Model
 │
 ▼
Response
 │
 ▼
User
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript
* REST API

### Database

* MongoDB
* Mongoose

### AI

* LLM API
* Embeddings
* Retrieval-Augmented Generation (RAG)
* Vector Database

> AI technologies are planned and will be implemented in later development stages.

### Development Tools

* Git
* GitHub
* VS Code
* npm

---

## 📁 Project Structure

```text
prabhat-ai/

│
├── client/
│   └── # React frontend
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   │
│   │   ├── controllers/
│   │   ├── middleware/
│   │   │
│   │   ├── models/
│   │   │   ├── Profile.ts
│   │   │   ├── Project.ts
│   │   │   ├── Skill.ts
│   │   │   ├── Learning.ts
│   │   │   └── Experience.ts
│   │   │
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
│
├── knowledge/
│   └── # Personal knowledge base
│
└── README.md
```

---

## 🔄 Backend Request Flow

The backend follows a layered architecture:

```text
Request
   ↓
Express
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Database / AI / RAG
   ↓
Response
```

This structure keeps HTTP handling, business logic, database operations, and AI functionality separated and maintainable.

---

# 🚀 Current Implementation

## Day 1 — Project Planning ✅

* Defined the purpose of Prabhat AI
* Planned the personal knowledge system
* Defined the overall project direction
* Established the 28-day development roadmap

---

## Day 2 — Backend Setup ✅

* Initialized Node.js backend
* Installed Express
* Configured TypeScript
* Created backend architecture
* Created Express application
* Created server entry point
* Added health-check endpoint
* Verified TypeScript compilation
* Verified production build
* Added environment-file protection

### Health Endpoint

```text
GET /api/health
```

Response:

```json
{
  "success": true,
  "message": "Prabhat AI server is running"
}
```

---

## Day 3 — Frontend Setup ✅

* Set up React + Vite frontend
* Configured TypeScript
* Configured Tailwind CSS
* Created basic chat UI foundation
* Created chat page structure
* Created message list structure
* Created user/AI message structure
* Added chat input
* Connected frontend structure with the Prabhat AI project architecture
* Verified frontend development setup

> The frontend is currently a foundation for the future AI chat interface. AI functionality will be connected in later roadmap stages.

---

## Day 4 — Database Foundation ✅

* Prepared MongoDB database
* Connected MongoDB to the backend
* Configured database environment variables
* Installed and configured Mongoose
* Created reusable MongoDB connection module
* Added MongoDB connection error handling
* Created initial data models
* Verified database connection
* Verified TypeScript production build
* Completed Git checkpoint

### Database Connection

The backend now connects to MongoDB through Mongoose.

```text
Prabhat AI Backend
       │
       ▼
    Mongoose
       │
       ▼
    MongoDB
```

### Initial Models

```text
MongoDB
│
├── Profile
├── Project
├── Skill
├── Learning
└── Experience
```

### Model Structure

#### Profile

```text
Profile
├── name
├── role
├── bio
├── location
├── email
└── socialLinks
```

#### Project

```text
Project
├── title
├── description
├── technologies
├── githubUrl
├── liveUrl
└── featured
```

#### Skill

```text
Skill
├── name
├── category
└── level
```

#### Learning

```text
Learning
├── topic
├── description
├── status
└── progress
```

#### Experience

```text
Experience
├── company
├── role
├── description
├── startDate
└── endDate
```

### Database Verification

Development server:

```text
MongoDB connected successfully
Prabhat AI server running on port 5000
```

Production TypeScript build:

```bash
npm run build
```

Build completed successfully.

---

# 📅 28-Day Development Roadmap

| Day | Focus                            | Status |
| --: | -------------------------------- | :----: |
|   1 | Project Planning                 |    ✅   |
|   2 | Backend Setup                    |    ✅   |
|   3 | Frontend Setup                   |    ✅   |
|   4 | MongoDB + Mongoose + Data Models |    ✅   |
|   5 | Personal Data                    |    ⬜   |
|   6 | Knowledge Base                   |    ⬜   |
|   7 | Data APIs                        |    ⬜   |
|   8 | Authentication                   |    ⬜   |
|   9 | Frontend Data Integration        |    ⬜   |
|  10 | AI Integration                   |    ⬜   |
|  11 | Chat API                         |    ⬜   |
|  12 | AI Service                       |    ⬜   |
|  13 | Prompt Engineering               |    ⬜   |
|  14 | Chat Interface                   |    ⬜   |
|  15 | Knowledge Retrieval              |    ⬜   |
|  16 | RAG Fundamentals                 |    ⬜   |
|  17 | Document Processing              |    ⬜   |
|  18 | Embeddings                       |    ⬜   |
|  19 | Vector Database                  |    ⬜   |
|  20 | Retrieval Pipeline               |    ⬜   |
|  21 | RAG Integration                  |    ⬜   |
|  22 | Context-Aware AI                 |    ⬜   |
|  23 | Chat Improvements                |    ⬜   |
|  24 | Testing                          |    ⬜   |
|  25 | Performance + Cleanup            |    ⬜   |
|  26 | Deployment                       |    ⬜   |
|  27 | Portfolio Presentation           |    ⬜   |
|  28 | Final Project & Deployment       |    ⬜   |

> The roadmap may be refined during implementation, but completed days will reflect only features that have actually been implemented and tested.

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory.

Example:

```env
PORT=5000

# Database
MONGODB_URI=

# AI
AI_API_KEY=

# Other configuration
```

**Never commit `.env` to GitHub.**

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/prabhat-ai.git
```

### 2. Navigate to the backend

```bash
cd prabhat-ai/server
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

### Build

```bash
npm run build
```

### Start production build

```bash
npm start
```

---

## 📌 Development Philosophy

Prabhat AI is being developed incrementally.

Each development day focuses on:

1. Understanding the concept
2. Implementing the feature
3. Testing the implementation
4. Committing the changes
5. Documenting the progress

The goal is not only to build the application, but also to understand the architecture and technologies used to build it.

---

## 👨‍💻 Developer

**Prabhat Jaidiya**

B.Sc. Mathematical Science
Delhi University

### Current Focus

* Full-Stack Development
* Node.js
* Express.js
* React
* TypeScript
* AI Engineering
* RAG
* Building production-ready projects

---

## 📈 Project Progress

```text
Prabhat AI

Day 1  ████████████████████████████████  ✅
Day 2  ████████████████████████████████  ✅
Day 3  ████████████████████████████████  ✅
Day 4  ████████████████████████████████  ✅
Day 5  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
...
Day 28 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜

Progress: 4/28 days — 14.29%
```

---

## ⭐ Goal

Build a real personal AI agent that can understand and communicate my professional journey through my own knowledge base.

**Building in public. Learning by building. 🚀**