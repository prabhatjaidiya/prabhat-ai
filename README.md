# ðŸ¤– Prabhat AI

A personal AI assistant that answers questions about Prabhat's professional background, technical skills, projects, and learning journey using a structured knowledge base, retrieval-augmented generation (RAG), conversation context, and GitHub data.

**Live Demo:** https://prabhat-ai.vercel.app
**Backend API:** https://prabhat-ai-api.onrender.com
**GitHub Repository:** https://github.com/prabhatjaidiya/prabhat-ai

---

## âœ¨ Features

- **Personal knowledge assistant** â€” answers questions about profile, skills, projects, and learning progress.
- **Retrieval-augmented generation (RAG)** â€” retrieves relevant knowledge to ground AI responses.
- **Context-aware conversations** â€” uses recent conversation history to resolve follow-up questions.
- **Conversation memory** â€” keeps a bounded recent message history for each conversation.
- **GitHub integration** â€” retrieves public repository metadata and, for relevant questions, recent commits from the `prabhat-ai` repository.
- **Learning progress awareness** â€” answers questions about completed, in-progress, and planned roadmap work based on stored knowledge.
- **Guardrails and validation** â€” validates chat inputs, bounds conversation history, and treats user and retrieved content as untrusted data.
- **Responsive chat interface** â€” desktop and mobile layouts, suggested prompts, loading/error states, and chat navigation.
- **Deployed frontend and backend** â€” frontend hosted on Vercel and backend hosted on Render.

## ðŸ§° Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

### Backend
- Node.js
- Express
- TypeScript
- REST API

### Database and Retrieval
- MongoDB
- Mongoose
- Embeddings and vector search for knowledge retrieval

### AI
- Google Gemini API
- `@google/genai`
- Gemini model configured by the backend

### Developer Tools
- Git and GitHub
- npm
- VS Code
- Postman or another API client for endpoint testing

---

## ðŸ—ï¸ Architecture

### Chat request flow

```text
User
 â”‚
 â–¼
React + TypeScript frontend
 â”‚
 â–¼
POST /api/chat
 â”‚
 â–¼
Express chat controller
 â”œâ”€â”€ Validate message and conversation ID
 â”œâ”€â”€ Load recent conversation history
 â”œâ”€â”€ Resolve contextual follow-up questions
 â”œâ”€â”€ Retrieve relevant personal knowledge
 â””â”€â”€ Retrieve GitHub data when the query requires it
      â”œâ”€â”€ Public repository metadata
      â””â”€â”€ Recent commits for the Prabhat AI repository
 â”‚
 â–¼
Build grounded context
 â”‚
 â–¼
Gemini AI service
 â”œâ”€â”€ Trusted system instructions and guardrails
 â”œâ”€â”€ Retrieved knowledge and GitHub context
 â””â”€â”€ Recent conversation history
 â”‚
 â–¼
AI response
 â”‚
 â”œâ”€â”€ Save user message
 â””â”€â”€ Save assistant response
 â”‚
 â–¼
React chat interface
```

### Main backend responsibilities

- **Controller:** request validation, orchestration, and HTTP responses.
- **Knowledge service:** retrieves relevant profile, skill, project, and learning information.
- **AI service:** generates grounded responses and resolves contextual queries.
- **Memory service:** stores bounded conversation history.
- **GitHub services:** retrieve repository metadata and recent commit history when needed.
- **Database models:** store structured personal knowledge in MongoDB.

---

## ðŸ“ Project Structure

```text
prabhat-ai/
â”œâ”€â”€ client/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”‚   â”œâ”€â”€ ChatHeader.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ ChatInput.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ MessageBubble.tsx
â”‚   â”‚   â”‚   â”œâ”€â”€ MessageList.tsx
â”‚   â”‚   â”‚   â””â”€â”€ Sidebar.tsx
â”‚   â”‚   â”œâ”€â”€ App.tsx
â”‚   â”‚   â”œâ”€â”€ index.css
â”‚   â”‚   â””â”€â”€ main.tsx
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ vite.config.ts
â”œâ”€â”€ server/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ config/
â”‚   â”‚   â”‚   â”œâ”€â”€ db.ts
â”‚   â”‚   â”‚   â””â”€â”€ systemPrompt.ts
â”‚   â”‚   â”œâ”€â”€ controllers/
â”‚   â”‚   â”‚   â””â”€â”€ chat.controller.ts
â”‚   â”‚   â”œâ”€â”€ models/
â”‚   â”‚   â”‚   â”œâ”€â”€ Experience.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ Learning.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ Profile.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ Project.ts
â”‚   â”‚   â”‚   â””â”€â”€ Skill.ts
â”‚   â”‚   â”œâ”€â”€ routes/
â”‚   â”‚   â”‚   â””â”€â”€ chat.routes.ts
â”‚   â”‚   â”œâ”€â”€ scripts/
â”‚   â”‚   â”‚   â””â”€â”€ testKnowledge.ts
â”‚   â”‚   â”œâ”€â”€ seed/
â”‚   â”‚   â”‚   â”œâ”€â”€ seed.ts
â”‚   â”‚   â”‚   â””â”€â”€ verify.ts
â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”‚   â”œâ”€â”€ ai.service.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ context.service.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ embedding.service.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ github-query.service.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ github.service.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ knowledge.service.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ memory.service.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ rag.service.ts
â”‚   â”‚   â”‚   â”œâ”€â”€ retrieval.service.ts
â”‚   â”‚   â”‚   â””â”€â”€ vector-search.service.ts
â”‚   â”‚   â”œâ”€â”€ app.ts
â”‚   â”‚   â””â”€â”€ server.ts
â”‚   â””â”€â”€ tests/
â”‚       â”œâ”€â”€ github-query.test.ts
â”‚       â””â”€â”€ memory.test.ts
â”œâ”€â”€ README.md
â””â”€â”€ .gitignore
```

---

## ðŸš€ Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database
- A Google Gemini API key
- Git

### 1. Clone the repository

```bash
git clone https://github.com/prabhatjaidiya/prabhat-ai.git
cd prabhat-ai
```

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `server/` directory. Use the variable names expected by the backend code and never commit real credentials.

Example configuration (replace the placeholders with your own values):

```dotenv
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GITHUB_USERNAME=prabhatjaidiya
```

**Important:** Environment variable names can differ depending on the implementation. Check the backend's configuration and service files before using this example. Do not add secret values to this README or commit `.env` files.

If the frontend uses a Vite API-base variable, configure it in `client/.env` using the exact variable name read by the frontend code. For local development, point it to the local backend URL.

### 4. Run the backend

From the `server/` directory:

```bash
npm run dev
```

Use the development script defined in `server/package.json`. If the script has a different name, run the script listed by `npm run`.

### 5. Run the frontend

In a separate terminal, from the `client/` directory:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

---

## ðŸ§ª Build and Verification

Run the backend production build:

```bash
cd server
npm run build
```

Run the frontend production build:

```bash
cd client
npm run build
```

The Day 27 local verification reported that both builds passed:
- Backend TypeScript compilation passed.
- Frontend TypeScript compilation and Vite production build passed.

---

## ðŸŒ Deployment

- **Frontend:** https://prabhat-ai.vercel.app
- **Backend:** https://prabhat-ai-api.onrender.com

The frontend and backend are deployed separately. Configure production environment variables in the hosting providers' settings rather than committing credentials to the repository.

---

## ðŸ” Security and Reliability

- Validate incoming chat messages and conversation IDs.
- Limit message length and retained conversation history.
- Keep API keys and database credentials in environment variables.
- Do not trust instructions embedded in user input, conversation history, or retrieved documents.
- Distinguish missing or unavailable GitHub data from an empty repository list.
- Avoid claiming exact code changes based only on a commit message.

---

## ðŸ—ºï¸ Roadmap

Prabhat AI was developed as a 28-day project.

- **Days 1â€“26:** Completed.
- **Day 27 â€” Portfolio Polish:** In progress until the final changes are committed and pushed.
- **Day 28 â€” Final QA and README:** Planned next.

Update this section when the project roadmap status changes.

---

## ðŸ‘¨â€ðŸ’» Author

**Prabhat Jaidiya**

- GitHub: https://github.com/prabhatjaidiya
- Prabhat AI repository: https://github.com/prabhatjaidiya/prabhat-ai

---

## ðŸ“„ License

Add a license if you intend to distribute or reuse this project under specific terms. No license is specified here.
