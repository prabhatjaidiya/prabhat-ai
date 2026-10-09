import "dotenv/config";
import mongoose from "mongoose";

import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Learning from "../models/Learning.js";

const seedProfile = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");

        // 1. Profile: update existing record instead of deleting it.
        await Profile.updateOne(
            {},
            {
                $set: {
                    name: "Prabhat Jaidiya",
                    role: "Aspiring Full-Stack Developer",
                    bio:
                        "B.Sc Mathematical Science graduate and aspiring Full-Stack Developer building projects with React, Node.js, Express, MongoDB, and modern web technologies.",
                    education: [
                        {
                            degree: "B.Sc Mathematical Science",
                            institution: "PGDAV College",
                            university: "University of Delhi",
                            status: "Completed",
                        },
                    ],
                },
            },
            { upsert: true }
        );

        console.log("Profile updated");

        // 2. Skills: upsert each skill using its name.
        const skills = [
            { name: "HTML", category: "Frontend", level: "Intermediate" },
            { name: "CSS", category: "Frontend", level: "Intermediate" },
            { name: "JavaScript", category: "Programming", level: "Intermediate" },
            { name: "TypeScript", category: "Programming", level: "Beginner" },
            { name: "React", category: "Frontend", level: "Intermediate" },
            { name: "Tailwind CSS", category: "Frontend", level: "Intermediate" },
            { name: "Node.js", category: "Backend", level: "Beginner" },
            { name: "Express.js", category: "Backend", level: "Beginner" },
            { name: "MongoDB", category: "Database", level: "Beginner" },
            { name: "Mongoose", category: "Database", level: "Beginner" },
            { name: "Git", category: "Tools", level: "Intermediate" },
            { name: "GitHub", category: "Tools", level: "Intermediate" },
        ];

        for (const skill of skills) {
            await Skill.updateOne(
                { name: skill.name },
                { $set: skill },
                { upsert: true }
            );
        }

        console.log("Skills updated");

        // 3. Projects: keep descriptions grounded in verified work.
        const projects = [
            {
                title: "Job Tracker",
                description:
                    "A full-stack application for tracking job and internship applications, managing application status, and organizing the job search process. The project uses a React and Vite frontend with Tailwind CSS, React Router, and TanStack Query. Its backend uses Node.js, Express, and TypeScript with MongoDB and Mongoose. Authentication uses JWT and bcrypt.",
                technologies: [
                    "React",
                    "Vite",
                    "Tailwind CSS",
                    "React Router",
                    "TanStack Query",
                    "Node.js",
                    "Express",
                    "TypeScript",
                    "MongoDB",
                    "Mongoose",
                    "JWT",
                    "bcrypt",
                ],
                githubUrl:
                    "https://github.com/prabhatjaidiya/job-tracker",
                liveUrl:
                    "https://job-tracker-frontend-26wf.onrender.com",
                featured: true,
            },
            {
                title: "Weather App",
                description:
                    "A responsive Progressive Web App for weather information, forecasts, air quality, weather alerts, and weather insights. Features include city search, current-location weather, hourly and five-day forecasts, interactive charts, favorites, recent searches, and PWA functionality.",
                technologies: [
                    "React",
                    "JavaScript",
                    "Vite",
                    "Tailwind CSS",
                    "Recharts",
                    "OpenWeather API",
                    "PWA",
                    "vite-plugin-pwa",
                    "Service Worker",
                    "LocalStorage",
                    "ESLint",
                ],
                githubUrl:
                    "https://github.com/prabhatjaidiya/Weather-App",
                liveUrl:
                    "https://weather-app-7cfd.vercel.app/",
                featured: true,
            },
            {
                title: "Expense Tracker",
                description:
                    "A responsive personal finance application built with React, Vite, and Tailwind CSS. It provides transaction management, financial analytics, budget management, notifications, authentication, profile management, dark mode, and CSV/PDF exports. It uses LocalStorage for client-side data persistence and includes a public demo mode.",
                technologies: [
                    "React",
                    "Vite",
                    "Tailwind CSS",
                    "React Router DOM",
                    "Context API",
                    "Recharts",
                    "Lucide React",
                    "React Icons",
                    "React Datepicker",
                    "React Toastify",
                    "PapaParse",
                    "jsPDF",
                    "jsPDF AutoTable",
                    "html2canvas",
                    "LocalStorage",
                ],
                githubUrl:
                    "https://github.com/prabhatjaidiya/Expense-Tracker",
                liveUrl:
                    "https://expense-tracker-lovat-pi.vercel.app/",
                featured: true,
            },
            {
                title: "Personal Portfolio",
                description:
                    "A responsive developer portfolio showcasing Prabhat Jaidiya's projects, technical skills, and frontend development journey. It uses a minimal dark design, reusable components, responsive layouts, animations, interactive elements, and project showcases.",
                technologies: [
                    "React",
                    "JavaScript",
                    "Tailwind CSS",
                    "Motion",
                    "Vite",
                    "React Icons",
                    "Recharts",
                    "Context API",
                    "LocalStorage",
                    "Git",
                    "GitHub",
                    "Vercel",
                ],
                githubUrl:
                    "https://github.com/prabhatjaidiya/portfolio",
                liveUrl:
                    "https://portfolio-mocha-xi-f9ohsuh54e.vercel.app/",
                featured: true,
            },
            {
                title: "ShopSphere",
                description:
                    "A full-stack e-commerce platform in development. Completed work includes the React and TypeScript frontend foundation, reusable components, customer-facing layouts and routes, product listing and detail pages, search, category and price filtering, sorting, cart state management, and an Express and TypeScript backend. MongoDB and Mongoose provide database models and product data persistence. Product APIs support listing, details, pagination, search, and filtering. Registration, login, JWT authentication, authentication middleware, and role-based protected routes have also been implemented. Cart and wishlist backend functionality remains a separate planned milestone.",
                technologies: [
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "React Router",
                    "TanStack Query",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "Mongoose",
                    "JWT",
                    "bcrypt",
                    "REST API",
                ],
                githubUrl:
                    "https://github.com/prabhatjaidiya/shopsphere",
                featured: true,
            },
            {
                title: "Prabhat AI",
                description:
                    "A personal AI agent representing Prabhat Jaidiya. The project uses Gemini API integration and structured knowledge about the developer's profile, skills, projects, and learning journey. Implemented capabilities include system instructions, MongoDB-based knowledge retrieval, Gemini embeddings, cosine-similarity vector search, top-K retrieval, relevance threshold filtering, a retrieval-augmented generation (RAG) pipeline, retrieval accuracy checks, and conversation memory with conversation IDs and bounded message history. Project-specific knowledge retrieval is being improved as part of the ongoing development roadmap.",
                technologies: [
                    "TypeScript",
                    "Node.js",
                    "MongoDB",
                    "Mongoose",
                    "Google Gemini API",
                    "@google/genai",
                    "gemini-embedding-001",
                    "Embeddings",
                    "Vector Search",
                    "Cosine Similarity",
                    "RAG",
                    "Conversation Memory",
                    "REST API",
                ],
                githubUrl: "https://github.com/prabhatjaidiya/prabhat-ai",
                featured: true,
            },
        ];

        for (const project of projects) {
            const { title, ...projectData } = project;

            await Project.updateOne(
                { title },
                { $set: projectData, $setOnInsert: { title } },
                { upsert: true }
            );
        }

        console.log("Projects updated");

        // 4. Learning roadmaps: synchronize confirmed progress.
        const learning = [
            {
                topic: "Node.js → MERN Roadmap",
                description:
                    "A 42-day learning roadmap covering Node.js fundamentals, Express.js, MongoDB, Mongoose, authentication, authorization, production backend architecture, and React-to-Node.js integration. Day 40, Production Backend Architecture, is complete. Next: Day 41, React + Node.js Integration.",
                status: "In Progress",
                progress: 95.24,
            },
            {
                topic: "ShopSphere",
                description:
                    "A 28-day full-stack e-commerce project covering customer-facing UI, product APIs, MongoDB persistence, authentication, role-based authorization, cart and wishlist functionality, and further full-stack integration. Day 12, Roles & Protected Routes, is complete. Next: Day 13, Cart & Wishlist Backend.",
                status: "In Progress",
                progress: 42.86,
            },
            {
                topic: "Prabhat AI",
                description:
                    "A 28-day project-based learning journey to build a personal AI agent with structured knowledge, embeddings, vector search, RAG, retrieval accuracy improvements, and conversation memory. Day 15, Conversation Memory, is complete. Next: Day 16, Project Knowledge.",
                status: "In Progress",
                progress: 53.57,
            },
        ];

        for (const item of learning) {
            const { topic, ...learningData } = item;

            await Learning.updateOne(
                { topic },
                { $set: learningData, $setOnInsert: { topic } },
                { upsert: true }
            );
        }

        console.log("Learning roadmaps updated");
        console.log("Seed synchronization completed successfully");
    } catch (error) {
        console.error("Seed synchronization failed:", error);
        process.exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("MongoDB disconnected");
        }
    }
};

void seedProfile();