# 🤖 Prabhat AI

> A personal AI agent designed to understand my career background, projects, skills, learning journey, and professional work — and answer questions about me using my own knowledge base.

## 🚧 Project Status

**Currently in development**

Prabhat AI is being built as a 28-day full-stack AI project.

**Current Progress:** 2/28 days completed — 7.14%

---

## 🎯 Project Goal

The goal of Prabhat AI is to build a personal AI agent that can represent my professional and learning journey.

It will eventually be able to answer questions such as:

- Who am I?
- What technologies do I know?
- What am I currently learning?
- What projects have I built?
- What technologies were used in my projects?
- What is my development experience?
- What are my current learning goals?
- What work have I completed?
- Questions about my portfolio and professional background

The agent will use my own structured knowledge and a **RAG (Retrieval-Augmented Generation)** pipeline to provide context-aware responses.

---

## ✨ Planned Features

### 👤 Personal Profile
- Career background
- Technical skills
- Education
- Learning journey
- Professional experience

### 💻 Project Knowledge
- Project descriptions
- Technologies used
- Features
- Development progress
- Technical decisions

### 📚 Learning Knowledge
- Technologies currently being learned
- Learning progress
- Notes and concepts
- Development roadmap

### 🤖 AI Assistant
- Natural language conversations
- Context-aware responses
- Personal knowledge retrieval
- AI-powered answers based on my information

### 🔎 RAG Pipeline
- Knowledge ingestion
- Document processing
- Embeddings
- Vector search
- Relevant context retrieval
- AI-generated responses

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
````

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

### AI

* LLM API
* Embeddings
* Retrieval-Augmented Generation (RAG)
* Vector Database

### Database

* PostgreSQL / MongoDB *(final implementation may evolve during development)*

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
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
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

## 🚀 Current Implementation

### Day 1 — Project Planning ✅

* Defined the purpose of Prabhat AI
* Planned the personal knowledge system
* Defined the overall project direction

### Day 2 — Backend Setup ✅

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

Health endpoint:

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

## 📅 28-Day Development Roadmap

| Day | Focus                      | Status |
| --- | -------------------------- | ------ |
| 1   | Project Planning           | ✅      |
| 2   | Backend Setup              | ✅      |
| 3   | TBD                        | ⬜      |
| 4   | TBD                        | ⬜      |
| 5   | TBD                        | ⬜      |
| ... | ...                        | ⬜      |
| 28  | Final Project & Deployment | ⬜      |

> The roadmap will be updated as development progresses.

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory.

Example:

```env
PORT=5000

# Database
DATABASE_URL=

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

### 2. Navigate to the project

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
Day 3  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
...
Day 28 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜

Progress: 2/28 days — 7.14%
```

---

## ⭐ Goal

Build a real personal AI agent that can understand and communicate my professional journey through my own knowledge base.

**Building in public. Learning by building. 🚀**

```

### One change I'd make before pushing

I intentionally used **"planned"** for the AI/RAG/database parts because you're only on **Day 2**. As you actually implement those technologies, we can update the README so your GitHub repository always reflects what you've genuinely built rather than what is merely planned.
```