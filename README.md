# 🤖 Prabhat AI

**A personal AI assistant powered by retrieval-augmented generation (RAG), conversational context, and GitHub integration.**

Prabhat AI answers questions about Prabhat Jaidiya's professional background, technical skills, projects, and learning journey. It combines a structured knowledge base with relevant retrieval and live GitHub data to provide contextual, grounded responses.

- **Live Demo:** https://prabhat-ai.vercel.app
- **Backend API:** https://prabhat-ai-api.onrender.com
- **GitHub Repository:** https://github.com/prabhatjaidiya/prabhat-ai

## ✨ Features

- **Personal knowledge assistant:** Answers questions about professional background, skills, projects, and learning progress.
- **Retrieval-Augmented Generation (RAG):** Retrieves relevant knowledge to ground responses.
- **Context-aware conversations:** Uses recent conversation history to interpret follow-up questions.
- **Conversation memory:** Maintains a bounded recent message history.
- **GitHub integration:** Retrieves public repository information and relevant recent commit data.
- **Learning progress awareness:** Answers questions about completed, ongoing, and planned learning milestones.
- **Guardrails and validation:** Validates chat input and limits retained conversation history.
- **Responsive chat UI:** Includes suggested prompts, message loading and error states, and chat navigation.
- **Production deployment:** Frontend hosted on Vercel and backend hosted on Render.

## 🧰 Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| UI | Lucide React, React Markdown, Remark GFM |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB, Mongoose |
| AI | Google Gemini API, `@google/genai` |
| Knowledge retrieval | Embeddings, vector search, RAG |
| Developer tools | Git, GitHub, npm |

## 🏗️ How It Works

1. A user sends a message through the React chat interface.
2. The frontend sends a `POST /api/chat` request to the backend.
3. The backend validates the message and conversation ID.
4. Context resolution and retrieval services find relevant conversation history and personal knowledge.
5. GitHub data is retrieved when relevant to the question.
6. The AI service generates a response using the available context and system instructions.
7. The response is returned to the frontend and displayed in the chat.

## 🚀 Getting Started

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

Install the backend dependencies:

```bash
cd server
npm install
```

In a separate terminal, install the frontend dependencies:

```bash
cd client
npm install
```

### 3. Configure backend environment variables

Create `server/.env`:

```dotenv
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GITHUB_USERNAME=prabhatjaidiya
```

Replace placeholder values with your own configuration. Never commit real credentials.

### 4. Configure the frontend

Create `client/.env`:

```dotenv
VITE_API_URL=http://localhost:5000
```

The frontend uses this variable as the API base URL. For production, configure `VITE_API_URL` in the frontend hosting settings to point to the deployed backend.

### 5. Start the backend

From the `server/` directory:

```bash
npm run dev
```

### 6. Start the frontend

From the `client/` directory, in another terminal:

```bash
npm run dev
```

Open the local URL printed by Vite.

## 🧪 Build and Verification

Build the backend:

```bash
cd server
npm run build
```

Build the frontend:

```bash
cd client
npm run build
```

The production build scripts compile the backend TypeScript and compile the frontend TypeScript before generating Vite production assets.

For final verification, test the chat endpoint, follow-up context, knowledge retrieval, GitHub integration, error handling, and deployed application.

## 🌐 Deployment

- **Frontend:** [Vercel deployment](https://prabhat-ai.vercel.app)
- **Backend:** [Render deployment](https://prabhat-ai-api.onrender.com)

The frontend and backend are deployed independently. Configure production environment variables in the relevant hosting dashboards. Do not expose server-side API keys or database credentials in frontend code or `VITE_` variables.

## 🔐 Security Considerations

- Keep Gemini API keys and database connection strings on the server.
- Never commit `.env` files containing real credentials.
- Validate incoming messages and conversation IDs.
- Limit message size and retained conversation history.
- Treat user messages and retrieved content as untrusted input.
- Handle external API failures without exposing sensitive server details.

## 🗺️ Project Roadmap

Prabhat AI was developed through a structured 28-day learning and implementation roadmap.

- **Days 1–27:** Completed.
- **Day 28 — Final QA and README:** In progress.

The final milestone includes end-to-end verification, production checks, build review, documentation, and the final GitHub review.

## 👨‍💻 Author

**Prabhat Jaidiya**

- [GitHub Profile](https://github.com/prabhatjaidiya)
- [Prabhat AI Repository](https://github.com/prabhatjaidiya/prabhat-ai)
- [Live Project](https://prabhat-ai.vercel.app)

## 📄 License

Check the repository's license before reusing or redistributing this project. Unless a license is added, no general permission to reuse the code is granted by this README.