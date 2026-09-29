# 🤖 Prabhat AI

> A personal AI agent designed to understand my career background, projects, skills, learning journey, and professional work — and answer questions about me using my own knowledge base.

---

## 🚧 Project Status

**Currently in active development**

Prabhat AI is being built as a **28-day full-stack AI engineering project**.

### Current Progress

**6/28 days completed — 21.43%**

```text
Day 1  ████████████████████████████████  ✅
Day 2  ████████████████████████████████  ✅
Day 3  ████████████████████████████████  ✅
Day 4  ████████████████████████████████  ✅
Day 5  ████████████████████████████████  ✅
Day 6  ████████████████████████████████  ✅
Day 7  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
...
Day 28 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
````

---

# 🎯 Project Goal

The goal of Prabhat AI is to build a personal AI agent capable of understanding and representing my professional and learning journey.

The agent will eventually be able to answer questions such as:

* Who is Prabhat?
* What technologies does Prabhat know?
* What is Prabhat currently learning?
* What projects has Prabhat built?
* What technologies were used in those projects?
* What development experience does Prabhat have?
* What are Prabhat's current learning goals?
* What work has Prabhat completed?
* Questions about Prabhat's portfolio and professional background

The long-term system will use my own structured knowledge together with a **Retrieval-Augmented Generation (RAG)** pipeline to provide context-aware responses.

---

# ✨ Planned Features

## 👤 Personal Profile

* Career background
* Technical skills
* Education
* Learning journey
* Professional experience
* Developer profile

## 💻 Project Knowledge

* Project descriptions
* Technologies used
* Features
* Development progress
* Technical decisions
* GitHub repositories
* Live project information

## 📚 Learning Knowledge

* Technologies currently being learned
* Learning progress
* Notes and concepts
* Development roadmaps
* Completed learning milestones

## 🤖 AI Assistant

* Natural language conversations
* Context-aware responses
* Personal knowledge retrieval
* AI-generated answers
* Career-focused questions
* Project-focused questions

## 🔎 RAG Pipeline

Planned for later stages:

* Knowledge ingestion
* Document processing
* Text chunking
* Embeddings
* Vector storage
* Semantic search
* Relevant context retrieval
* Context-aware prompting
* AI-generated responses

> RAG functionality will be implemented incrementally during the later stages of the project.

---

# 🏗️ Architecture

The planned architecture follows a layered approach:

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
                         Route
                           │
                           ▼
                       Controller
                           │
                           ▼
                        Service
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          Database     Knowledge      AI Model
                         Retrieval
                           │
                           ▼
                       RAG Pipeline
                           │
                           ▼
                        Response
                           │
                           ▼
                    React Frontend
                           │
                           ▼
                         User
```

The architecture is intentionally designed so that the AI layer remains separate from HTTP handling and database logic.

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express.js
* TypeScript
* REST API

## Database

* MongoDB
* Mongoose

## AI

Planned and incremental:

* LLM integration
* Local Llama inference
* Cloud LLM provider for deployed demo
* Embeddings
* Retrieval-Augmented Generation
* Vector database

The AI service is designed as a separate layer so the underlying model can be changed without restructuring the rest of the application.

## Development Tools

* Git
* GitHub
* VS Code
* npm
* Postman / API testing tools

---

# 📁 Project Structure

```text
prabhat-ai/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   └── MessageList.tsx
│   │   │
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   │
│   │   ├── controllers/
│   │   │   └── chat.controller.ts
│   │   │
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
│   │   │   └── chat.routes.ts
│   │   │
│   │   ├── services/
│   │   │   └── ai.service.ts
│   │   │
│   │   ├── seed/
│   │   │
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

# 🔄 Backend Request Flow

Prabhat AI follows a layered backend architecture:

```text
HTTP Request
     │
     ▼
Express
     │
     ▼
Route
     │
     ▼
Controller
     │
     ▼
Service
     │
     ├──────────────► Database
     │
     ├──────────────► Knowledge Retrieval
     │
     └──────────────► AI Model / RAG
     │
     ▼
Response
```

This separation keeps:

* HTTP handling
* Business logic
* Database operations
* AI functionality

independent and maintainable.

---

# 🚀 Current Implementation

## Day 1 — Project Planning ✅

### Completed

* Defined the purpose of Prabhat AI
* Defined the personal AI agent concept
* Planned the personal knowledge system
* Defined the initial architecture
* Established the 28-day development roadmap
* Defined the long-term AI/RAG direction

---

# Day 2 — Backend Setup ✅

### Completed

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

```http
GET /api/health
```

### Response

```json
{
  "success": true,
  "message": "Prabhat AI server is running"
}
```

---

# Day 3 — Frontend Setup ✅

### Completed

* Set up React + Vite frontend
* Configured TypeScript
* Configured Tailwind CSS
* Created chat UI foundation
* Created chat page structure
* Created message list
* Created user/AI message structure
* Created chat input
* Created reusable chat components
* Verified frontend development setup

### Chat Components

```text
ChatHeader
ChatInput
MessageList
MessageBubble
```

At this stage the frontend was primarily a UI foundation for the future AI assistant.

---

# Day 4 — Database Foundation ✅

### Completed

* Prepared MongoDB database
* Connected MongoDB to backend
* Configured database environment variables
* Installed Mongoose
* Created reusable MongoDB connection module
* Added database connection error handling
* Created initial data models
* Verified MongoDB connection
* Verified TypeScript production build
* Completed Git checkpoint

### Database Flow

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

### Profile

```text
Profile
├── name
├── role
├── bio
├── location
├── email
└── socialLinks
```

### Project

```text
Project
├── title
├── description
├── technologies
├── githubUrl
├── liveUrl
└── featured
```

### Skill

```text
Skill
├── name
├── category
└── level
```

### Learning

```text
Learning
├── topic
├── description
├── status
└── progress
```

### Experience

```text
Experience
├── company
├── role
├── description
├── startDate
└── endDate
```

### Database Verification

```text
MongoDB connected successfully
Prabhat AI server running on port 5000
```

---

# Day 5 — Personal Data Foundation ✅

### Completed

Day 5 established the initial personal knowledge foundation for Prabhat AI.

The project now has structured models for storing information about:

* Profile
* Projects
* Skills
* Learning
* Experience

The database structure is designed to become the source of truth for the future AI knowledge system.

### Knowledge Direction

```text
Personal Information
        │
        ▼
Structured MongoDB Data
        │
        ▼
Knowledge Retrieval
        │
        ▼
AI Context
```

This structured information will later become part of the retrieval and RAG pipeline.

---

# Day 6 — Basic Chat API ✅

Day 6 established the first complete frontend-to-backend chat pipeline.

### Chat Flow

```text
React Chat UI
      │
      ▼
POST /api/chat
      │
      ▼
Express Route
      │
      ▼
Chat Controller
      │
      ▼
AI Service
      │
      ▼
Response
      │
      ▼
React UI
```

### Implemented

* Created `POST /api/chat`
* Created chat route
* Created chat controller
* Created AI service layer
* Connected React chat UI to the backend
* Added frontend message state
* Added request handling
* Added backend request validation
* Added empty-message handling
* Added whitespace validation
* Added backend error handling
* Added CORS configuration
* Tested API communication
* Tested frontend → backend → service → frontend flow
* Committed and pushed changes to GitHub

### Chat Endpoint

```http
POST /api/chat
```

### Request

```json
{
  "message": "Who is Prabhat?"
}
```

### Current Temporary Response

```json
{
  "success": true,
  "response": "AI service received: Who is Prabhat?"
}
```

> The current response is intentionally temporary. The actual AI model will be connected during the AI integration stages.

### AI Service

Current service boundary:

```text
Controller
     │
     ▼
AI Service
     │
     ▼
Temporary AI Response
```

This architecture allows the AI implementation to be replaced later without changing the route or frontend architecture.

---

# 📅 28-Day Development Roadmap

| Day | Focus                            | Status |
| --: | -------------------------------- | :----: |
|   1 | Project Planning                 |    ✅   |
|   2 | Backend Setup                    |    ✅   |
|   3 | Frontend Setup                   |    ✅   |
|   4 | MongoDB + Mongoose + Data Models |    ✅   |
|   5 | Personal Data Foundation         |    ✅   |
|   6 | Basic Chat API                   |    ✅   |
|   7 | First Working AI                 |    ⬜   |
|   8 | AI Provider / Model Integration  |    ⬜   |
|   9 | AI Service Architecture          |    ⬜   |
|  10 | Prompt Engineering               |    ⬜   |
|  11 | Chat API Improvements            |    ⬜   |
|  12 | Chat Interface Improvements      |    ⬜   |
|  13 | Personal Knowledge Integration   |    ⬜   |
|  14 | Knowledge Retrieval              |    ⬜   |
|  15 | RAG Fundamentals                 |    ⬜   |
|  16 | Document Processing              |    ⬜   |
|  17 | Text Chunking                    |    ⬜   |
|  18 | Embeddings                       |    ⬜   |
|  19 | Vector Database                  |    ⬜   |
|  20 | Semantic Search                  |    ⬜   |
|  21 | Retrieval Pipeline               |    ⬜   |
|  22 | RAG Integration                  |    ⬜   |
|  23 | Context-Aware AI                 |    ⬜   |
|  24 | Chat Improvements                |    ⬜   |
|  25 | Testing                          |    ⬜   |
|  26 | Performance + Cleanup            |    ⬜   |
|  27 | Deployment + Portfolio           |    ⬜   |
|  28 | Final QA & Project Completion    |    ⬜   |

> The roadmap may be refined as implementation progresses, but a day is marked complete only after its implementation and testing are finished.

---

# 🧠 AI Development Strategy

Prabhat AI is being designed to remain **model-agnostic**.

The application should not depend directly on a single AI provider.

### Planned Architecture

```text
                 AI Service
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
     Local Llama          Cloud Provider
       Inference             Demo AI
          │                     │
          └──────────┬──────────┘
                     ▼
               Common AI Logic
```

### Local Development

The long-term local setup is planned around **Llama-based local inference**.

Benefits include:

* Local experimentation
* No per-request API cost
* Better understanding of local AI inference
* Ability to experiment without depending on a cloud API

### Public Demo

A cloud AI provider can be used for the deployed demonstration version.

The application architecture should keep the model provider behind the AI service layer.

---

# 🔎 RAG Architecture

RAG will be implemented in later stages.

The planned pipeline is:

```text
Personal Knowledge
       │
       ▼
Document Processing
       │
       ▼
Text Chunking
       │
       ▼
Embeddings
       │
       ▼
Vector Database
       │
       ▼
Semantic Search
       │
       ▼
Relevant Context
       │
       ▼
Prompt + Context
       │
       ▼
LLM
       │
       ▼
Personalized Response
```

The goal is for Prabhat AI to answer questions using **my own verified knowledge**, rather than relying only on the model's general knowledge.

---

# 🔐 Environment Variables

Create a `.env` file inside the `server/` directory.

Example:

```env
PORT=5000

# Database
MONGODB_URI=

# AI
AI_API_KEY=

# Client
CLIENT_URL=
```

### Important

Never commit `.env` to GitHub.

Use `.env.example` for non-secret configuration documentation.

Example:

```env
PORT=5000
MONGODB_URI=
AI_API_KEY=
CLIENT_URL=
```

---

# 💻 Local Development

## 1. Clone the Repository

```bash
git clone https://github.com/prabhatjaidiya/prabhat-ai.git
```

```bash
cd prabhat-ai
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create:

```text
server/.env
```

Configure the required environment variables.

---

## 3. Start Backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

## 4. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

Vite will provide the local development URL.

---

# 🧪 API Endpoints

## Health Check

```http
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

## Chat

```http
POST /api/chat
```

Request:

```json
{
  "message": "Who is Prabhat?"
}
```

Current response:

```json
{
  "success": true,
  "response": "AI service received: Who is Prabhat?"
}
```

### Invalid Request

Request:

```json
{
  "message": ""
}
```

Response:

```json
{
  "success": false,
  "message": "Message is required"
}
```

---

# 🏗️ Development Philosophy

Prabhat AI is being developed incrementally.

Each development day focuses on:

1. Understanding the concept
2. Designing the architecture
3. Implementing the feature
4. Testing the implementation
5. Reviewing the code
6. Creating a Git checkpoint
7. Documenting the progress

The goal is not only to build an application, but also to understand the technologies and architecture behind it.

---

# 📈 Project Progress

```text
Prabhat AI — 28 Day Development

Day 01  ████████████████████████████████  ✅
Day 02  ████████████████████████████████  ✅
Day 03  ████████████████████████████████  ✅
Day 04  ████████████████████████████████  ✅
Day 05  ████████████████████████████████  ✅
Day 06  ████████████████████████████████  ✅
Day 07  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
Day 08  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
Day 09  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
Day 10  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
...
Day 28  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
```

### Current Progress

```text
6 / 28 days

21.43%
```

---

# 📌 Current Development Focus

The immediate next milestone is:

## Day 7 — First Working AI

The next stage will move the project from a simulated AI response:

```text
"AI service received: ..."
```

toward an actual AI-powered response.

The existing architecture will remain:

```text
React
  ↓
Express
  ↓
Route
  ↓
Controller
  ↓
AI Service
  ↓
AI Model
  ↓
Response
```

RAG will **not** be introduced prematurely. It will be implemented after the basic AI integration and retrieval foundations are established.

---

# 👨‍💻 Developer

## Prabhat Jaidiya

**B.Sc. Mathematical Science — Delhi University**

### Current Focus

* Full-Stack Development
* React
* TypeScript
* Node.js
* Express.js
* MongoDB
* AI Engineering
* LLMs
* RAG
* Building production-ready projects

---

# ⭐ Final Goal

Build a real personal AI agent that can understand, retrieve, and communicate my professional and learning journey using my own knowledge base.

The long-term goal is:

```text
My Data
   ↓
Knowledge Base
   ↓
Retrieval
   ↓
RAG
   ↓
AI Model
   ↓
Prabhat AI
   ↓
Personalized Answers
```

Prabhat AI is being built as a practical learning project to explore **full-stack development, AI engineering, LLM integration, and RAG systems**.

---

## 🚀 Building in Public

**Learning by building.
Building by understanding.
Improving every day.**

> One day. One feature. One commit at a time. 🚀

```

One correction before you paste it: **Day 5 is marked as completed above based on the current 6/28 project state**, while the older README you pasted had Day 5–6 defined differently. This version intentionally aligns the README with the **actual progress we've been tracking in this project**, rather than preserving the stale old roadmap.
```