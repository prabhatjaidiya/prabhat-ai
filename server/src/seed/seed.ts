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
                    "A full-stack e-commerce platform built with React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, and Mongoose. Features include product browsing, authentication, role-based access, cart and wishlist, checkout, order management, customer order pages, and Razorpay payment gateway integration. Day 19 of the 28-day roadmap is complete. Next: Day 20 — Admin Order Management.",
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
                    "A deployed personal AI agent representing Prabhat Jaidiya, built with TypeScript, Node.js, MongoDB, and the Google Gemini API. Features include structured knowledge retrieval, embeddings, vector search, RAG, conversation memory, document processing, GitHub integration, learning progress retrieval, context-aware responses, security guardrails, agent testing, a professional chat interface, portfolio integration, GitHub live data, security improvements, and deployment. The frontend is deployed on Vercel and the backend on Render. All 28 days of the project roadmap are complete, including final QA and README documentation.",
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
                    "React",
                    "Vite",
                    "Tailwind CSS",
                    "Vercel",
                    "Render",
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
                    "Completed the full 42-day Node.js → MERN roadmap. Covered Node.js fundamentals, Express.js, REST APIs, MongoDB, Mongoose, authentication, authorization, backend security, production architecture, and React-to-Node.js integration. All 42 days are complete.",
                status: "Completed",
                progress: 100,
            },
            {
                topic: "ShopSphere",
                description:
                    "A 28-day full-stack e-commerce project using React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, and Mongoose. Completed product listing and details, product APIs, authentication, role-based authorization, cart and wishlist functionality, frontend-backend integration, checkout, order management, customer order pages, Razorpay payment gateway integration, and admin product management. Day 19 is complete. Next: Day 20 — Admin Order Management.",
                status: "In Progress",
                progress: 67.86,
            },
            {
                topic: "Prabhat AI",
                description:
                    "A completed 28-day project-based learning journey to build and deploy a personal AI agent using TypeScript, Node.js, MongoDB, and the Google Gemini API. Completed structured knowledge retrieval, embeddings, vector search, RAG, conversation memory, document processing, GitHub integration, learning progress retrieval, context-aware responses, security guardrails, agent testing, professional chat UI, portfolio integration, GitHub live data, security improvements, deployment, portfolio polish, final QA, and README documentation. The frontend is deployed on Vercel and the backend on Render. All 28 days are complete.",
                status: "Completed",
                progress: 100,
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