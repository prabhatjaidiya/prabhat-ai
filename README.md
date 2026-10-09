# 🤖 Prabhat AI
> A personal AI agent designed to understand my career background, projects, skills, learning journey, and professional work — and eventually answer questions about me using my own knowledge base.
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
Knowledge Retrieval
  │
  ├── Query Embedding
  │
  ├── Vector Search
  │
  ├── Top-K Selection
  │
  └── Relevance Threshold
  │
  ▼
Relevant Knowledge
  │
  ▼
Context Formatting
  │
  ▼
AI Service
  │
  ├── System Instructions
  ├── Retrieved Context
  └── User Question
  │
  ▼
Gemini LLM
  │
  ▼
Grounded AI Response
  │
  ▼
React Frontend
  │
  ▼
User

And your **Long-Term Architecture** can remain as a high-level architecture, but I'd make the RAG section slightly more explicit:

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
                       Services
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          Database    Knowledge       AI Model
                       Retrieval
                           │
                           ▼
                     RAG Pipeline
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        Embeddings    Vector Search   Context
                           │
                           ▼
                     Relevant Knowledge
                           │
                           ▼
                       Gemini
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
│   │   │
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
│   │   │   ├── ai.service.ts           
│   │   │   ├── embedding.service.ts
│   │   │   ├── knowledge.service.ts
│   │   │   ├── vector-search.service.ts
│   │   │   ├── context.service.ts
│   │   │   ├── rag.service.ts
│   │   │   └── memory.service.ts        
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
├── README.md
└── .gitignore
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
Chat Controller
     │
     ├──► Validate User Message
     │
     ▼
Knowledge Service
     │
     ├──► Fetch Personal Data from MongoDB
     │
     ├──► Generate Query Embedding
     │
     ├──► Generate/Prepare Knowledge Embeddings
     │
     ├──► Global Vector Search
     │
     ├──► Top-K Selection
     │
     └──► Relevance Threshold
     │
     ├──► No Relevant Knowledge
     │        │
     │        └──► Return Knowledge-Unavailable Response
     │
     ▼
Context Formatting
     │
     ▼
AI Service
     │
     ├──► System Prompt
     ├──► Retrieved Personal Context
     ├──► User Question
     └──► Gemini AI Model
     │
     ▼
Grounded AI Response
     │
     ▼
HTTP Response
```

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
# Day 9 — Knowledge Retrieval ✅

Day 9 connected Prabhat AI's structured personal data to the chat pipeline.

## Completed

- Implemented knowledge retrieval from MongoDB.
- Retrieved Profile, Skill, Project, and Learning records.
- Integrated knowledge retrieval with the chat controller.
- Passed retrieved personal context to the AI service.
- Updated the AI service to accept knowledge context.
- Tested profile, project, skills, and learning-related queries.

## Knowledge Retrieval Flow

```text
User Message
     │
     ▼
Chat Controller
     │
     ▼
Knowledge Service
     │
     ▼
MongoDB
     │
     ▼
Retrieved Personal Data
     │
     ▼
AI Service
     │
     ▼
Gemini Response
```

**Status:** Completed ✅
# Day 10 — Embeddings ✅

Day 10 introduced embedding generation and semantic similarity to Prabhat AI.

## Completed

- Configured Gemini `gemini-embedding-001`.
- Created `embedding.service.ts`.
- Generated document and query embeddings.
- Used 3072-dimensional embeddings.
- Implemented cosine similarity.
- Tested semantic retrieval against personal project data.

## Embedding Flow

```text
Personal Knowledge
       │
       ▼
Document Embedding
       │
       ▼
Vector Representation

User Query
       │
       ▼
Query Embedding
       │
       ▼
Cosine Similarity
       │
       ▼
Semantic Matching
```

**Status:** Completed ✅
# Day 11 — Vector Search & Retrieval ✅

Day 11 introduced vector-based ranking to retrieve personal knowledge relevant to a user's query.

## Completed

- Created `vector-search.service.ts`.
- Implemented cosine-similarity ranking.
- Implemented Top-K result selection.
- Added similarity-threshold filtering.
- Integrated vector search into `knowledge.service.ts`.
- Added `toAIContext()` to exclude embedding arrays from the AI context.
- Verified the TypeScript build.
- Reduced the observed knowledge-context size from approximately 608,056 characters to 3,781 characters.
- Completed four manual chat UI tests covering project, skills, learning, and unrelated queries.

## Vector Search Flow

```text
User Query
     │
     ▼
Query Embedding
     │
     ▼
Compare with Document Embeddings
     │
     ▼
Cosine Similarity
     │
     ▼
Threshold Filtering
     │
     ▼
Top-K Results
     │
     ▼
AI Context
     │
     ▼
Gemini Response
```

## Implementation Note

Embeddings are generated at runtime and are not currently persisted in MongoDB. The unrelated-query test also showed that vector search can return personal records when the similarity threshold is set to `0`; the system prompt handled the unrelated question as intended.

**Status:** Completed ✅
# Day 12 — RAG Pipeline ✅

Day 12 connected embeddings, vector search, knowledge retrieval,
context formatting, and Gemini into a complete Retrieval-Augmented
Generation pipeline for Prabhat AI.

## Completed

- Reviewed Knowledge Retrieval, Embeddings, and Vector Search concepts.
- Implemented the complete RAG pipeline.
- Connected user query → query embedding → vector search.
- Implemented global Top-K retrieval across skills, projects, and learning records.
- Added formatted AI context from retrieved knowledge.
- Connected retrieved context with the user question before sending it to Gemini.
- Reused `PRABHAT_AI_SYSTEM_PROMPT` for consistent Prabhat AI behavior.
- Added relevance-threshold filtering using `RAG_MIN_RELEVANCE_SCORE`.
- Added an application-level relevance gate to prevent Gemini from generating responses when no sufficiently relevant knowledge is retrieved.
- Integrated profile information into the RAG context.
- Updated the controller to use `generateRAGResponse()`.
- Verified that embedding arrays and unnecessary internal data are excluded from the AI context.
- Tested relevant skill, project, learning, and profile questions.
- Tested unknown and unsupported questions.
- Verified grounded responses using retrieved personal knowledge.

## RAG Pipeline Flow

```text
User Query
    │
    ▼
Query Embedding
    │
    ▼
Global Vector Search
    │
    ▼
Similarity Ranking
    │
    ▼
Relevance Threshold
    │
    ├──────────────► No Relevant Knowledge
    │                       │
    │                       ▼
    │               Knowledge-Unavailable
    │                    Response
    │
    ▼
Top-K Results
    │
    ▼
Profile + Retrieved Context
    │
    ▼
Context Formatting
    │
    ▼
User Question + Retrieved Context
    │
    ▼
System Instructions
    │
    ▼
Gemini LLM
    │
    ▼
Grounded AI Response
```

## RAG Architecture

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
               Knowledge Service
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       MongoDB    Embeddings   Vector Search
                                   │
                                   ▼
                            Top-K + Threshold
                                   │
                                   ▼
                            Retrieved Knowledge
                                   │
                                   ▼
                            Context Formatting
                                   │
                                   ▼
                              AI Service
                                   │
                      ┌────────────┼────────────┐
                      ▼            ▼            ▼
                 System Prompt   Context     Question
                      │            │            │
                      └────────────┼────────────┘
                                   ▼
                                 Gemini
                                   │
                                   ▼
                             Final Response
```

## RAG Concepts

RAG stands for **Retrieval-Augmented Generation**.

The system first retrieves relevant personal knowledge and then provides that knowledge to Gemini so the generated response is grounded in the retrieved information.

### Retrieval

Find relevant knowledge using:

- Query embeddings
- Cosine similarity
- Global Top-K ranking
- Similarity threshold

### Generation

Gemini receives:

- System instructions
- Retrieved personal knowledge
- User question

and generates a natural response based on the available context.

## Relevance Gate

The system uses:

```env
RAG_MIN_RELEVANCE_SCORE=0.7
```

If no result meets the minimum relevance score, Gemini is not called.

Instead, the application returns:

```text
I don't have enough information in my current knowledge
to answer that question.
```

This prevents the model from turning missing information into unsupported personal claims.

## Testing

### Test 1 — Skills

Query:

```text
What technologies does Prabhat know?
```

Result:

Relevant personal/project knowledge was retrieved and Gemini generated a technology-focused response.

**Status:** Passed ✅

### Test 2 — Projects

Query:

```text
What projects has Prabhat worked on?
```

Result:

Project-related knowledge was retrieved and Gemini generated a project-focused response.

**Status:** Passed ✅

### Test 3 — Learning

Query:

```text
What is Prabhat currently learning?
```

Result:

Learning-related knowledge was retrieved and Gemini generated a learning-focused response.

**Status:** Passed ✅

### Test 4 — Profile

Query:

```text
What is Prabhat's role?
```

Result:

Profile information was successfully included in the RAG context and Gemini correctly identified Prabhat's role as an aspiring Full-Stack Developer.

**Status:** Passed ✅

### Test 5 — Unknown Question

Query:

```text
What is Prabhat's favorite programming language?
```

Result:

No sufficiently relevant knowledge was retrieved.
The application stopped before calling Gemini and returned a knowledge-unavailable response.

**Status:** Passed ✅

### Test 6 — Unsupported Professional Experience

Query:

```text
Does Prabhat have 10 years of professional experience?
```

Result:

I do not have that information.

**Status:** Passed ✅

## Implementation Notes

User queries use:

```text
RETRIEVAL_QUERY
```

Stored knowledge uses:

```text
RETRIEVAL_DOCUMENT
```

Knowledge is currently searched in memory using cosine similarity.

Embeddings are generated at runtime and are not currently persisted in MongoDB.

The current global Top-K search combines:

- Skills
- Projects
- Learning

before performing similarity ranking.

## Known Limitations

- Knowledge embeddings are regenerated at runtime instead of being persisted.
- Global semantic Top-K can sometimes retrieve a less useful knowledge category.
- Knowledge freshness depends on the information currently stored in MongoDB.
- Retrieval quality can be improved later with metadata filtering, hybrid search, reranking, or better knowledge chunking.

## Key Learning

RAG is not simply sending database information to an LLM.

A reliable RAG system requires:

```text
Good Retrieval
      +
Relevant Context
      +
Grounded Generation
      +
Relevance Validation
      =
More Reliable AI Responses
```

The application-level relevance gate is especially important because **absence of retrieved evidence should not automatically be interpreted as proof that something is false**.

**Status:** Completed ✅
# Day 13 — Improve Accuracy ✅

Day 13 focused on improving the accuracy and grounding behavior of
the RAG pipeline.

## Completed

- Reviewed the complete RAG pipeline.
- Evaluated retrieval quality across different query types.
- Evaluated the similarity threshold.
- Evaluated the Top-K value.
- Kept `RAG_MIN_RELEVANCE_SCORE=0.7`.
- Kept `Top-K=3`.
- Reviewed and improved retrieved context formatting.
- Integrated profile information into the RAG context.
- Updated the controller to use `generateRAGResponse()`.
- Improved grounding instructions in the RAG generation prompt.
- Added protection against unsupported factual inference.
- Added explicit handling for unsupported personal yes/no questions.
- Tested relevant queries.
- Tested irrelevant queries.
- Tested unknown questions.
- Tested unsupported professional-experience questions.

## Accuracy Configuration

Current retrieval configuration:

```text
Top-K: 3
Similarity Threshold: 0.7
```
---
# Day 14 — Week 2 QA 🧪

Day 14 focused on validating the complete RAG pipeline through functional testing, edge-case testing, retrieval-quality testing, regression testing, and targeted fixes.

## QA Objectives

- Verify the complete RAG pipeline end-to-end.
- Validate retrieval behavior across different query types.
- Test edge cases and unsupported questions.
- Verify semantic search quality.
- Identify retrieval and routing issues.
- Apply minimal fixes based on actual test results.
- Run regression tests after the fixes.

## Pipeline Review

The complete pipeline was reviewed:

```text
User Query
   ↓
Query Embedding
   ↓
Vector Search
   ↓
Relevant Knowledge
   ↓
Profile Context
   ↓
RAG Prompt
   ↓
Gemini
   ↓
Grounded Final Answer
```

**Result: PASS ✅**

---

## Functional Testing

Tested multiple categories of queries:

- Profile / education queries
- Skills queries
- Project queries
- Learning journey queries
- Backend technology queries
- Job Tracker queries
- ShopSphere queries

The pipeline successfully generated grounded responses for the tested relevant queries.

**Result: PASS ✅**

---

## Edge-Case Testing

Tested:

- Unknown professional experience
- Irrelevant questions
- Ambiguous questions
- Very short queries
- Spelling mistakes
- Partial knowledge queries
- Unsupported factual questions

Examples included:

```text
"Google"
"capital of France"
"backend"
"React?"
"tecnologies"
"databases and authentication"
```

The system avoided unsupported factual claims and safely handled queries where sufficient knowledge was unavailable.

**Result: PASS ✅**

---

## RAG Quality Testing

### Job Tracker Semantic Query

Tested:

```text
Which applications has Prabhat built for managing jobs?
```

Initial retrieval showed:

```text
Prabhat AI   → 0.7100
Job Tracker  → 0.6969
```

The Job Tracker result was just below the previous `0.7` threshold.

After evaluation, the retrieval threshold was adjusted to:

```text
Similarity Threshold: 0.68
Top-K: 3
```

The query then successfully retrieved Job Tracker and produced the expected grounded answer.

---

## Project Query Routing Fix

During QA, the query:

```text
Which projects use MongoDB?
```

initially triggered the exhaustive project-list branch.

This caused all directly returned projects to receive:

```text
similarity: 1
```

This was investigated and confirmed **not to be a cosine similarity bug**.

The issue was caused by an overly broad `isProjectListQuery()` condition.

### Fix

Project-list detection was made stricter so exhaustive retrieval is triggered only for:

- Explicit requests for all projects.
- Broad questions asking what projects Prabhat has worked on.

Specific project-filter queries now use semantic retrieval.

---

## Vector Search Verification

The vector search implementation was reviewed and verified:

- Dot product calculation
- Vector magnitude calculation
- Cosine similarity
- Zero-vector protection
- Similarity threshold filtering
- Sorting by similarity
- Top-K selection

The implementation was confirmed to be correct.

---

## Embedding Verification

The embedding implementation was also reviewed.

Verified:

```text
Document → RETRIEVAL_DOCUMENT
Query    → RETRIEVAL_QUERY
Model    → gemini-embedding-001
```

Embedding generation and similarity calculation were confirmed to be functioning correctly.

---

## Final Regression Tests

### 1. Full Project List

Query:

```text
What projects has Prabhat worked on?
```

**Result: PASS ✅**

The system correctly returned the project list and distinguished completed and in-progress projects.

### 2. MongoDB Project Query

Query:

```text
Which projects use MongoDB?
```

Retrieved relevant knowledge including:

```text
MongoDB Skill       → 0.7215
ShopSphere Learning → 0.6832
Job Tracker         → 0.6825
```

**Result: PASS ✅**

The final answer correctly identified the relevant projects.

### 3. Unsupported Google Query

Query:

```text
Has Prabhat worked at Google?
```

**Result: PASS ✅**

The system did not hallucinate professional experience and correctly stated that it did not have information confirming this.

### 4. Irrelevant Query

Query:

```text
What is the capital of France?
```

**Result: PASS ✅**

No relevant knowledge was returned and the system did not attempt to fabricate an answer.

---

## Final Day 14 Retrieval Configuration

After QA and regression testing:

```text
Top-K: 3
Similarity Threshold: 0.68
Embedding Model: gemini-embedding-001
```

> Note: `0.68` was selected based on observed retrieval behavior during QA, particularly the Job Tracker semantic query scoring `0.6969`.

---

## Day 14 Final Status

```text
Pipeline Review        ✅
Functional Testing     ✅
Edge-Case Testing      ✅
RAG Quality Testing    ✅
Root-Cause Analysis    ✅
Fixes Applied          ✅
Regression Testing     ✅
Notes Updated          ✅
```

**Day 14 — Week 2 QA: COMPLETE ✅**

**Progress: 14 / 28 days — 50%**

---

## Week 2 Summary

The RAG foundation is now validated through:

- Knowledge retrieval
- Query embeddings
- Vector search
- Semantic similarity
- Top-K retrieval
- Relevance thresholding
- Profile context
- Grounded generation
- Unsupported-query handling
- Edge-case handling
- Regression testing

The system is now ready to move into **Day 15 — Conversation Memory**.

---
# Day 15 — Conversation Memory 🧠

Day 15 focused on adding short-term conversation memory to Prabhat AI so the assistant can remember previous messages within the same conversation, understand follow-up questions, and use conversation history alongside the existing RAG pipeline.

## Memory Objectives

- Understand conversation memory and its purpose.
- Separate conversation memory from the RAG knowledge base.
- Design a conversation-history structure.
- Introduce conversation IDs.
- Store user and assistant messages.
- Retrieve recent conversation history.
- Pass conversation history to Gemini.
- Combine conversation context with RAG context.
- Test multi-turn conversations.
- Verify conversation isolation.
- Limit the amount of history passed to the model.
- Check for unwanted context leakage.

---

## Conversation Memory vs RAG

Conversation memory and RAG serve different purposes.

### Conversation Memory

Conversation memory provides short-term context from the current conversation.

It helps Prabhat AI understand questions such as:

```text
User: My main project is ShopSphere.

Later:
User: What did I just tell you?
```

The assistant can use the previous message to understand the follow-up question.

### RAG Knowledge

RAG retrieves relevant factual information from Prabhat AI's persistent knowledge base.

For example:

```text
User: What database did I use for ShopSphere?
```

The RAG pipeline can retrieve relevant ShopSphere knowledge from the database.

### Combined Architecture

```text
Conversation Memory → Current conversational context
RAG                 → Persistent factual knowledge
```

Both are passed separately to Gemini so conversational context does not replace factual retrieval.

---

## Memory Flow Design

The Day 15 conversation flow was designed as:

```text
User Message
    ↓
Conversation ID
    ↓
Retrieve Recent Conversation History
    ↓
Query Embedding
    ↓
Vector Search
    ↓
Relevant Knowledge
    ↓
Conversation History + RAG Context
    ↓
Gemini
    ↓
AI Response
    ↓
Save User Message + Assistant Response
```

This extends the existing RAG pipeline without replacing it.

---

## Message Structure

Conversation messages use a simple structure:

```text
{
    role: "user" | "assistant",
    content: string
}
```

Example:

```text
[
    {
        role: "user",
        content: "My main project is ShopSphere."
    },
    {
        role: "assistant",
        content: "ShopSphere is one of Prabhat's projects."
    }
]
```

This allows the assistant to preserve the order and role of each message.

---

## Conversation Identification

A `conversationId` was introduced so separate conversations can maintain independent histories.

Example request:

```text
{
    "conversationId": "test-001",
    "message": "What did I just tell you?"
}
```

Messages using the same conversation ID share history.

Different conversation IDs remain isolated.

```text
test-001 ≠ test-002
```

This prevents one conversation's short-term context from leaking into another.

---

## Memory Service

A new service was introduced:

```text
server/src/services/memory.service.ts
```

The memory service is responsible for:

- Storing conversation messages.
- Retrieving conversation history.
- Limiting the history window.
- Separating conversations by ID.
- Clearing a conversation when required.

For the Day 15 implementation, memory is stored using an in-memory `Map`.

Conceptually:

```text
Map<
    conversationId,
    ConversationMessage[]
>
```

This keeps the initial implementation simple while preserving a clean separation between memory logic and the existing RAG services.

---

## Conversation History Limit

Unlimited conversation history is not sent to Gemini.

The current configuration is:

```text
MAX_HISTORY_MESSAGES = 10
```

The system retrieves:

```text
history.slice(-10)
```

This means only the latest 10 individual user/assistant messages are included in the context sent to Gemini.

Older messages remain outside the active history window.

This prevents conversation context from growing indefinitely.

---

## RAG + Conversation Memory Integration

The existing `generateRAGResponse()` flow was extended to receive conversation history separately from retrieved knowledge.

The conceptual function flow became:

```text
generateRAGResponse(
    question,
    context,
    conversationHistory
)
```

The Gemini prompt now contains separate sections:

```text
<conversation_history>
Previous conversation messages
</conversation_history>

<retrieved_knowledge>
Relevant RAG knowledge
</retrieved_knowledge>

<user_question>
Current user question
</user_question>
```

Keeping these sections separate makes their responsibilities clear.

Conversation history helps interpret the conversation.

Retrieved knowledge remains the primary factual source for stored personal information.

---

## Controller Integration

The chat controller was updated to:

1. Validate the user message.
2. Validate the conversation ID.
3. Retrieve previous conversation history.
4. Retrieve relevant RAG knowledge.
5. Prepare the RAG context.
6. Send conversation history, knowledge, and the current question to Gemini.
7. Save the user message.
8. Save the assistant response.

The previous unconditional early return for missing semantic knowledge was removed from this flow so conversation-only follow-up questions can still be answered from available conversation history.

---

## Multi-Turn Conversation Testing

A conversation was tested using the same conversation ID.

Example:

```text
User:
My favorite frontend technology is React.

User:
I am building an AI project called Prabhat AI.

User:
What frontend technology did I say I like?
```

Prabhat AI responded that the user had said their favorite frontend technology was React.

**Result: PASS ✅**

This confirmed that information from earlier turns was available to later requests.

---

## Follow-Up Question Testing

Test conversation:

```text
User:
My main project is ShopSphere.

Later:
What did I just tell you?
```

Prabhat AI correctly responded that the user had said their main project was ShopSphere.

**Result: PASS ✅**

This confirmed that the assistant could resolve follow-up questions using conversation history.

---

## Memory + RAG Testing

A follow-up question was tested:

```text
What database did I use?
```

The system used the current conversation context together with available retrieved knowledge to generate the response.

This verified the intended architecture:

```text
Conversation Memory
        +
       RAG
        ↓
      Gemini
```

**Result: PASS ✅**

---

## Conversation Isolation Testing

A second conversation ID was created without the previous conversation history.

Example:

```text
conversationId: test-002
```

The assistant correctly reported that it did not have the previous conversation information.

This confirmed:

```text
Conversation A history
        ≠
Conversation B history
```

No conversation-history leakage was observed.

**Result: PASS ✅**

---

## History Limit Testing

A dedicated conversation was populated with multiple messages:

```text
Message 1
Message 2
Message 3
...
Message 11
```

The final conversation-history diagnostics showed:

```text
historyMessages: 10
```

The retained history contained the latest user/assistant message pairs, including:

```text
Message 7
Message 8
Message 9
Message 10
Message 11
```

Older messages were outside the active history window.

The assistant was still able to identify Message 11 from the retained conversation context.

**Result: PASS ✅**

---

## Context Leakage Testing

Different conversation IDs were tested to ensure previous messages were not accidentally shared across conversations.

The new conversation started with an empty conversation history and did not have access to information provided only in the previous conversation.

**Result: PASS ✅**

---

## Day 15 Project Changes

### New File

```text
server/src/services/memory.service.ts
```

Responsible for short-term conversation-history management.

### Updated Files

```text
server/src/controllers/chat.controller.ts
server/src/services/ai.service.ts
```

`chat.controller.ts` now manages conversation IDs, retrieves history, and stores new messages.

`ai.service.ts` now passes conversation history separately from retrieved RAG knowledge to Gemini.

---

## Current Limitation

The Day 15 implementation uses in-memory storage.

Therefore:

```text
Server Restart
      ↓
In-Memory Map Reset
      ↓
Conversation History Lost
```

Conversation history is not yet persistent across server restarts.

This is acceptable for the Day 15 foundation because the goal was to implement and validate the conversation-memory flow without prematurely adding database persistence.

Future improvements can introduce persistent conversation storage if required.

---

## Day 15 Testing Summary

```text
Conversation Memory Concept       ✅
Memory vs RAG Separation          ✅
Memory Flow Design                ✅
Conversation ID Handling          ✅
Message Storage                   ✅
History Retrieval                 ✅
Gemini History Integration        ✅
Multi-Turn Conversation           ✅
Follow-Up Questions               ✅
Memory + RAG                      ✅
Conversation Isolation            ✅
10-Message History Limit          ✅
Old Context Removal               ✅
Context Leakage Check             ✅
```

---

## Day 15 Final Status

```text
Concept Review              ✅
Memory Architecture         ✅
Memory Service              ✅
Controller Integration      ✅
Gemini Integration          ✅
Multi-Turn Testing          ✅
Follow-Up Testing           ✅
Conversation Isolation      ✅
History Limit Testing       ✅
Notes Updated               ✅
Git / Final Verification    ⏳
```

**Day 15 — Conversation Memory: IN PROGRESS 🟡**

**Official Progress: 14 / 28 days — 50%**

Day 15 will be marked complete only after the final TypeScript/Git verification and explicit completion confirmation.

---

## Next Step

Complete the final project checks:

```text
npx tsc --noEmit
git status
```

After the Day 15 work is verified and committed, the project will be ready to move forward to the next roadmap day.

Do not start Day 16 until Day 15 is explicitly confirmed complete.

---
# Day 16 — Project Knowledge ✅

## Goal

Improve project-specific knowledge retrieval, reduce irrelevant context passed to the Gemini model, and verify that Prabhat AI answers project questions accurately without inventing unsupported information.

## Completed

- Added and verified project-specific knowledge retrieval.
- Implemented a provisional similarity threshold of `0.72` for retrieved results.
- Filtered results below the threshold from normal semantic retrieval context.
- Improved unknown-question handling by returning an empty result list when no results meet the threshold.
- Updated RAG instructions to prioritize grounded answers and distinguish completed, in-progress, and planned work.
- Synchronized project knowledge and learning progress through the seed script.
- Tested relevant project questions, unknown questions, exhaustive project listing, and implementation-status accuracy.

## Relevance Filtering

Normal semantic retrieval keeps results with a similarity score of at least `0.72`.

```ts
const results = toAIContext(searchResults).filter(
    (result) => result.similarity >= 0.72
);
```

The threshold is provisional. Similarity scores alone do not guarantee semantic relevance, so retrieval quality must continue to be evaluated using test questions.

## Regression Testing

| Test | Expected behavior | Result |
|---|---|---|
| ShopSphere technology query | Retrieve relevant project knowledge | Passed |
| Unknown banking-project query | Return no relevant results and avoid invented facts | Passed |
| List all projects | Return all six project records | Passed |
| ShopSphere implementation status | Separate implemented features from planned work | Passed |
| TypeScript verification | No compiler errors | Passed |
| Git verification | Clean working tree after commit | Passed |

## Key Learning

- A non-empty retrieval result does not necessarily mean the result is relevant.
- Similarity thresholds can reduce irrelevant context, but they require testing and calibration.
- Unknown questions should not trigger invented personal or project information.
- Exhaustive queries such as listing all projects need a separate retrieval path.
- Project documentation must distinguish completed features from planned milestones.

## Day 16 Status

Project knowledge retrieval improvements and regression testing are documented. The Git checkpoint was committed locally, and the working tree was verified as clean. The local branch was one commit ahead of the remote at the last check.

## Next Step

Day 17 — continue the Prabhat AI roadmap with the next planned milestone.
---
# 📅 28-Day Development Roadmap

| Day | Focus | Status |
|---:|---|:---:|
| 1 | Project Planning | ✅ |
| 2 | Backend Setup | ✅ |
| 3 | Frontend Setup | ✅ |
| 4 | MongoDB + Mongoose + Data Models | ✅ |
| 5 | Personal Data Foundation | ✅ |
| 6 | Basic Chat API | ✅ |
| 7 | First Working AI | ✅ |
| 8 | System Instructions | ✅ |
| 9 | Knowledge Retrieval | ✅ |
| 10 | Embeddings | ✅ |
| 11 | Vector Search & Retrieval | ✅ |
| 12 | Chat Interface Improvements | ✅ |
| 13 | Personal Knowledge Integration | ✅ |
| 14 | Retrieval Pipeline | ✅ |
| 15 | RAG Fundamentals | ✅ |
| 16 | Document Processing | ✅ |
| 17 | Text Chunking | 🚧 |
| 18 | RAG Integration | ⬜ |
| 19 | Context-Aware AI | ⬜ |
| 20 | Chat Improvements | ⬜ |
| 21 | Testing | ⬜ |
| 22 | Performance + Cleanup | ⬜ |
| 23 | Context-Aware AI | ⬜ |
| 24 | Chat Improvements | ⬜ |
| 25 | Testing | ⬜ |
| 26 | Performance + Cleanup | ⬜ |
| 27 | Deployment + Portfolio | ⬜ |
| 28 | Final QA & Project Completion | ⬜ |

**Current progress:** 16/28 days completed — **57.14%**

**Current:** Day 16 — Document Processing ✅

**Next:** Day 17 — Upcoming Milestone

---
# 🧠 AI Development Strategy
Prabhat AI is being designed to remain **model-agnostic**.
The application should not depend permanently on a single AI provider.
## Planned Architecture
```text
                    AI Service
                        │
            ┌───────────┴───────────┐
            │                       │
            ▼                       ▼
      Local Llama              Cloud Provider
       Inference                 Demo AI
            │                       │
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

Prabhat AI uses a Retrieval-Augmented Generation (RAG) pipeline to answer
questions using Prabhat's own verified knowledge.

The current pipeline is:

```text
User Question
      │
      ▼
Query Embedding
      │
      ▼
Semantic Vector Search
      │
      ▼
Similarity Ranking
      │
      ▼
Relevance Threshold
      │
      ▼
Top-K Relevant Knowledge
      │
      ▼
Context Formatting
      │
      ▼
Prompt + Retrieved Context
      │
      ▼
Gemini LLM
      │
      ▼
Grounded Personalized Response

Personal Knowledge
      │
      ├── Skills
      ├── Projects
      └── Learning Records
              │
              ▼
        Document Embeddings
              │
              ▼
       Vector Representation
              │
              ▼
        Semantic Vector Search
```

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
## 📈 Project Progress

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
Day 09  ████████████████████████████████  ✅
Day 10  ████████████████████████████████  ✅
Day 11  ████████████████████████████████  ✅
Day 12  ████████████████████████████████  ✅
Day 13  ████████████████████████████████  ✅
Day 14  ████████████████████████████████  ✅
Day 15  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
...
Day 28  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⬜
```

## 📊 Current Progress

```text

**Current progress:** 14/28 days completed — **50%**

**Current:** Day 14 — Week 2 QA ✅

**Next:** Day 15 — Conversation Memory

```
---
## Current Development Focus

### Day 9 — Knowledge Retrieval ✅
- Implemented structured knowledge retrieval from MongoDB.
- Connected retrieved profile, skills, projects, and learning data to the chat controller and Gemini AI service.
- Enabled Prabhat AI to answer questions using relevant personal context.

### Day 10 — Embeddings ✅
- Configured Gemini's `gemini-embedding-001` model.
- Created `embedding.service.ts` for document and query embeddings.
- Generated 3072-dimensional embeddings.
- Implemented cosine similarity for semantic matching.
- Tested semantic retrieval and confirmed ShopSphere ranked first for an online shopping platform query.

### Day 11 — Vector Search & Retrieval 🚧

**Status:** Steps 1–4 completed. Step 5 (Notes + Git) in progress.

**Implementation completed:**
- Created `vector-search.service.ts`.
- Implemented cosine similarity ranking, Top-K results, and similarity threshold filtering.
- Integrated semantic retrieval into `knowledge.service.ts`.
- Generated query embeddings and ranked relevant skills, projects, and learning records.
- Added `toAIContext()` to exclude embedding arrays before sending retrieved context to Gemini.
- Updated the AI service integration and verified the TypeScript build.

**Context optimization:**
- Reduced the retrieved knowledge context from approximately 608,056 characters to 3,781 characters.
- Resolved the HTTP 429 issue encountered during the skills query by removing unnecessary embedding arrays from the AI context.

**Manual chat tests:**

| Test | Result |
|---|---|
| ShopSphere project query | Passed |
| Skills query | Passed |
| Learning progress query | Passed |
| Unrelated general-knowledge query | Passed — the assistant stayed within its intended scope |

**Observation:** Unrelated queries can still retrieve personal records because the similarity threshold is currently set to `0`. The system prompt prevents the assistant from answering unrelated questions, but retrieval threshold tuning may be worth investigating.

**Remaining tasks:**
- Update Day 11 notes.
- Commit the documentation and notes.
- Verify Git status and ensure the working tree is clean.
- Mark Day 11 complete only after the checkpoint is confirmed.

**Current progress:** 10/28 days completed (35.71%).

---
# 👨‍💻 Developer

## Prabhat Jaidiya

**B.Sc. Mathematical Science — Delhi University**

### Current Focus

- Full-Stack Development
- React
- TypeScript
- Node.js
- Express.js
- MongoDB
- REST API Development
- AI Engineering
- Large Language Models (LLMs)
- Prompt Engineering
- Embeddings and Vector Search
- Retrieval-Augmented Generation (RAG)
- Building and deploying production-ready projects

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