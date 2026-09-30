# 🤖 Prabhat AI

> A personal AI agent designed to understand my career background, projects, skills, learning journey, and professional work — and eventually answer questions about me using my own knowledge base.

---

# 🚧 Project Status

**Currently in active development**

Prabhat AI is being built as a **28-day full-stack AI engineering project**.

## Current Progress

**8/28 days completed — 28.57%**

```text
Day 01  ████████████████████████████████  ✅
Day 02  ████████████████████████████████  ✅
Day 03  ████████████████████████████████  ✅
Day 04  ████████████████████████████████  ✅
Day 05  ████████████████████████████████  ✅
Day 06  ████████████████████████████████  ✅
Day 07  ████████████████████████████████  ✅
Day 08  ████████████████████████████████  ✅
Day 09  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
...
Day 28  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
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

The long-term system will use structured personal knowledge together with a **Retrieval-Augmented Generation (RAG)** pipeline to provide context-aware responses.

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
* AI-generated responses
* Context-aware responses
* Personal knowledge retrieval
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

Prabhat AI follows a layered backend architecture.

## Current AI Request Flow

```text
User
  │
  ▼
React Frontend
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
System Instructions
  │
  ▼
Gemini LLM
  │
  ▼
AI Response
  │
  ▼
React Frontend
  │
  ▼
User
```

## Long-Term Architecture

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

The architecture keeps:

* HTTP handling
* Business logic
* Database operations
* Knowledge retrieval
* AI functionality

separated and maintainable.

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

### Current

* Google Gemini API
* `@google/genai`
* Gemini 3.5 Flash Lite
* LLM-powered chat responses
* System instructions

### Planned

* Model-agnostic AI service
* Local Llama inference
* Cloud LLM provider for deployed demo
* Embeddings
* Retrieval-Augmented Generation
* Vector database

The AI implementation is kept behind the AI service layer so the underlying model can be changed later without restructuring the rest of the application.

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
│   │   │
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
│   │   │   ├── db.ts
│   │   │   └── systemPrompt.ts
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
AI Service
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

# Day 1 — Project Planning ✅

## Completed

* Defined the purpose of Prabhat AI
* Defined the personal AI agent concept
* Planned the personal knowledge system
* Defined the initial architecture
* Established the 28-day development roadmap
* Defined the long-term AI/RAG direction

---

# Day 2 — Backend Setup ✅

## Completed

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

## Health Endpoint

```http
GET /api/health
```

## Response

```json
{
  "success": true,
  "message": "Prabhat AI server is running"
}
```

---

# Day 3 — Frontend Setup ✅

## Completed

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

## Chat Components

```text
ChatHeader
ChatInput
MessageList
MessageBubble
```

At this stage, the frontend was primarily a UI foundation for the future AI assistant.

---

# Day 4 — Database Foundation ✅

## Completed

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

## Database Flow

```text
Prabhat AI Backend
        │
        ▼
     Mongoose
        │
        ▼
      MongoDB
```

## Initial Models

```text
MongoDB

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

---

# Day 5 — Personal Data Foundation ✅

Day 5 established the initial personal knowledge foundation for Prabhat AI.

## Completed

* Established structured personal data models
* Defined Profile data
* Defined Project data
* Defined Skill data
* Defined Learning data
* Defined Experience data
* Prepared the database structure for future knowledge retrieval
* Established the personal knowledge architecture

## Knowledge Direction

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

## Chat Flow

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

## Implemented

* Created `POST /api/chat`
* Created chat route
* Created chat controller
* Created AI service layer
* Connected React chat UI to backend
* Added frontend message state
* Added request handling
* Added backend request validation
* Added empty-message handling
* Added whitespace validation
* Added backend error handling
* Added CORS configuration
* Tested API communication
* Tested frontend → backend → service → frontend flow
* Created Git checkpoint

## Chat Endpoint

```http
POST /api/chat
```

## Request

```json
{
  "message": "Hello"
}
```

The initial service returned a temporary response:

```text
AI service received: Hello
```

This temporary implementation was replaced during Day 7 with the real AI integration.

---

# Day 7 — First Working AI ✅

Day 7 was the first major AI milestone of Prabhat AI.

The project moved from a simulated response to a **real LLM-powered response**.

## Goal

Create the first working AI conversation pipeline:

```text
User
  ↓
React Chat UI
  ↓
POST /api/chat
  ↓
Express
  ↓
AI Service
  ↓
Gemini
  ↓
AI Response
  ↓
React UI
```

## AI Provider

Google Gemini is currently used as the cloud AI provider for development and testing.

The integration uses:

```text
@google/genai
```

## Current Model

```text
gemini-3.5-flash-lite
```

## AI Service Architecture

```text
Chat Controller
      │
      ▼
AI Service
      │
      ▼
Google Gemini
      │
      ▼
Generated Response
```

The provider-specific implementation remains inside the AI service rather than being placed directly inside the controller or React application.

## Implemented

* Installed `@google/genai`
* Configured Gemini API access
* Added `GEMINI_API_KEY`
* Kept the API key inside backend environment variables
* Implemented real Gemini generation
* Connected `/api/chat` to the real AI service
* Connected React chat UI to real AI responses
* Added frontend API error handling
* Tested real AI responses
* Tested multiple questions
* Verified environment-file protection
* Verified `server/.env` is not tracked by Git
* Created Git checkpoint

## AI Service

The current service follows this concept:

```text
generateAIResponse(message)
        │
        ▼
GoogleGenAI
        │
        ▼
Gemini Model
        │
        ▼
response.text
```

## Example Request

```http
POST /api/chat
```

```json
{
  "message": "Explain React in simple words."
}
```

## Example Response

```json
{
  "success": true,
  "response": "AI-generated response..."
}
```

The exact response is generated dynamically by the LLM.

## Day 7 Testing

The following questions were tested successfully:

```text
Hello, what can you do?

Who is Prabhat?

What technologies does Prabhat use?

What is Prabhat AI?

Explain React in simple words.

What is Node.js?
```

At this stage, Gemini did not yet have controlled access to Prabhat's personal knowledge base.

Personal knowledge retrieval and RAG are intentionally implemented in later roadmap stages.

---

# Day 8 — System Instructions ✅

Day 8 established the **identity, behavior, response rules, and boundaries** of Prabhat AI.

## Goal

The goal was to make Prabhat AI behave as a dedicated personal AI assistant rather than a generic chatbot.

The system instructions define:

* AI identity
* Purpose
* Response behavior
* Accuracy requirements
* Anti-hallucination rules
* Professional communication style
* Unknown-information behavior
* Completed vs in-progress vs planned work
* Identity boundaries

## System Identity

Prabhat AI is defined as:

```text
You are Prabhat AI, a personal AI assistant representing Prabhat Jaidiya.
```

Its purpose is to provide accurate information about:

* Education
* Technical skills
* Projects
* Professional background
* Learning journey
* Career development

## Response Rules

The system instructions require Prabhat AI to:

* Prioritize accuracy
* Never invent information
* Never guess when information is unavailable
* Clearly acknowledge missing information
* Distinguish completed, in-progress, and planned work
* Avoid exaggerating skills or experience
* Maintain a professional communication style
* Answer questions directly
* Remain consistent with its identity

## Anti-Hallucination Behavior

Prabhat AI was specifically tested against unsupported information.

For example:

```text
Prabhat worked at Google as a senior software engineer.
Tell me about his experience there.
```

The AI correctly responded that it did not have information confirming that experience.

This verifies that the system instructions are actively influencing the AI's behavior.

## Unknown Information Test

When asked about information that is not currently available, the AI does not fabricate an answer.

For example:

```text
What projects has Prabhat built?
```

The AI correctly acknowledged that it did not currently have specific project information available.

This behavior is intentional because the personal knowledge retrieval system has not yet been integrated into the AI pipeline.

## System Prompt Architecture

```text
User Message
      │
      ▼
System Instructions
      │
      ▼
AI Service
      │
      ▼
Gemini
      │
      ▼
Response
```

## System Prompt Location

```text
server/src/config/systemPrompt.ts
```

The system instructions are centralized instead of being scattered throughout the application.

## AI Service Integration

The AI service now passes the system instructions to Gemini:

```text
AI Service
    │
    ├── User Message
    │
    └── System Instructions
             │
             ▼
          Gemini
             │
             ▼
          Response
```

## Day 8 Testing

The following tests were completed:

```text
What are you?

What skills does Prabhat have?

Tell me something you don't know about Prabhat.

Prabhat worked at Google as a senior software engineer.
Tell me about his experience there.

What projects has Prabhat definitely completed?
```

The AI successfully:

* Maintained its identity
* Avoided unsupported claims
* Acknowledged missing information
* Rejected an unsupported employment claim
* Avoided fabricating project information

## Day 8 Git Checkpoint

The Day 8 implementation was committed successfully.

Current Git status:

```text
On branch main
Your branch is ahead of 'origin/main' by 1 commit.

nothing to commit, working tree clean
```

The local Day 8 commit is ready to be pushed to GitHub.

---

# 📅 28-Day Development Roadmap

| Day | Focus                                | Status |
| --: | ------------------------------------ | :----: |
|   1 | Project Planning                     |    ✅   |
|   2 | Backend Setup                        |    ✅   |
|   3 | Frontend Setup                       |    ✅   |
|   4 | MongoDB + Mongoose + Data Models     |    ✅   |
|   5 | Personal Data Foundation             |    ✅   |
|   6 | Basic Chat API                       |    ✅   |
|   7 | First Working AI                     |    ✅   |
|   8 | System Instructions                  |    ✅   |
|   9 | Prompt Engineering Basics            |    ⬜   |
|  10 | Prompt Design & Structured Responses |    ⬜   |
|  11 | Chat API Improvements                |    ⬜   |
|  12 | Chat Interface Improvements          |    ⬜   |
|  13 | Personal Knowledge Integration       |    ⬜   |
|  14 | Knowledge Retrieval                  |    ⬜   |
|  15 | RAG Fundamentals                     |    ⬜   |
|  16 | Document Processing                  |    ⬜   |
|  17 | Text Chunking                        |    ⬜   |
|  18 | Embeddings                           |    ⬜   |
|  19 | Vector Database                      |    ⬜   |
|  20 | Semantic Search                      |    ⬜   |
|  21 | Retrieval Pipeline                   |    ⬜   |
|  22 | RAG Integration                      |    ⬜   |
|  23 | Context-Aware AI                     |    ⬜   |
|  24 | Chat Improvements                    |    ⬜   |
|  25 | Testing                              |    ⬜   |
|  26 | Performance + Cleanup                |    ⬜   |
|  27 | Deployment + Portfolio               |    ⬜   |
|  28 | Final QA & Project Completion        |    ⬜   |

> A day is marked complete only after its implementation and testing are finished.

---

# 🧠 AI Development Strategy

Prabhat AI is being designed to remain **model-agnostic**.

The application should not depend permanently on a single AI provider.

## Planned Architecture

```text
                    AI Service
                        │
            ┌───────────┴───────────┐
            │                       │
            ▼                       ▼
      Local Llama              Cloud Provider
       Inference                 Demo AI
            │                       │
            └───────────┬───────────┘
                        ▼
                 Common AI Logic
```

## Current Development

The current implementation uses:

```text
Google Gemini
gemini-3.5-flash-lite
@google/genai
```

to establish the working LLM pipeline.

The model-specific implementation remains inside the AI service layer.

## Local Development

The long-term local setup is planned around **Llama-based local inference**.

Potential benefits include:

* Local experimentation
* No per-request API cost
* Better understanding of local AI inference
* Ability to experiment without depending entirely on a cloud API

## Public Demo

A cloud AI provider can be used for the deployed demonstration version.

The application architecture keeps the model provider behind the AI service layer so the provider can be changed later.

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

The goal is for Prabhat AI to answer questions using **Prabhat's own verified knowledge**, rather than relying only on general model knowledge.

---

# 🔐 Environment Variables

Create a `.env` file inside the `server/` directory.

Example:

```env
PORT=5000

# Database
MONGODB_URI=

# AI
GEMINI_API_KEY=

# Client
CLIENT_URL=
```

## Important

Never commit `.env` to GitHub.

The backend environment file is:

```text
server/.env
```

It is ignored by Git and is not tracked in the repository.

Use `.env.example` for documenting required configuration without exposing secrets.

Example:

```env
PORT=5000

MONGODB_URI=

GEMINI_API_KEY=

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

Configure:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173
```

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

### Request

```json
{
  "message": "Explain React in simple words."
}
```

### Successful Response

```json
{
  "success": true,
  "response": "AI-generated response..."
}
```

The response is generated by the configured Gemini model.

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
Day 07  ████████████████████████████████  ✅
Day 08  ████████████████████████████████  ✅
Day 09  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
Day 10  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
...
Day 28  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
```

## Current Progress

```text
8 / 28 days

28.57%
```

---

# 📌 Current Development Focus

## Day 8 — System Instructions ✅

Day 8 is complete.

The system instructions now control:

* Identity
* Purpose
* Response behavior
* Accuracy
* Anti-hallucination behavior
* Professional communication
* Unknown-information handling
* Completed vs planned work

The current architecture remains:

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
System Instructions
  ↓
Gemini
  ↓
Response
```

RAG, embeddings, vector search, and personal knowledge retrieval are **not being introduced prematurely**.

They will be implemented according to the later roadmap stages.

## Next Development Focus

### Day 9 — Prompt Engineering Basics

The next milestone will focus on improving how prompts are designed and structured for reliable AI responses.

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
* Prompt Engineering
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

Prabhat AI is being built as a practical learning project to explore:

* Full-stack development
* AI engineering
* LLM integration
* Prompt engineering
* Knowledge retrieval
* RAG systems
* Vector search
* Production AI architecture

---

# 🚀 Building in Public

**Learning by building.**

**Building by understanding.**

**Improving every day.**

> One day. One feature. One commit at a time. 🚀

````

### One important correction to your original roadmap

Your pasted README had:

```text
Day 8  → System Instructions
Day 9  → AI Service Architecture
Day 10 → Prompt Engineering
````

That **doesn't match the roadmap we're currently tracking**.

Our official tracking is:

```text
Day 8  → System Instructions       ✅
Day 9  → Prompt Engineering Basics ⬜
Day 10 → Prompt Design & Structured Responses ⬜
```

So the README above uses the **actual tracked roadmap**.

### Current Prabhat AI status

**8/28 — 28.57% complete ✅**

Next: **Day 9 — Prompt Engineering Basics**