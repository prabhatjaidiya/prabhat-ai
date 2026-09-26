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