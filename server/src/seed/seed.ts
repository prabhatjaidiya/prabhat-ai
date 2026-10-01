import "dotenv/config";
import mongoose from "mongoose";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Learning from "../models/Learning.js";

const seedProfile = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");

        await Profile.deleteMany({});

        await Profile.create({
            name: "Prabhat Jaidiya",
            role: "Aspiring Full-Stack Developer",
            bio: "B.Sc Mathematical Science graduate and aspiring Full-Stack Developer building projects with React, Node.js, Express, MongoDB, and modern web technologies.",
            education: [
                {
                    degree: "B.Sc Mathematical Science",
                    institution: "PGDAV College",
                    university: "University of Delhi",
                    status: "Completed",
                },
            ],
        });

        console.log("Profile data seeded successfully");

        await Skill.deleteMany({});

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

        await Skill.insertMany(skills);

        console.log("Skills seeded successfully");

        const projects = [
            {
                title: "Job Tracker",
                description:
                    "A full-stack application for tracking job and internship applications, managing application status, and organizing the job search process.",
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
                    "bcrypt"
                ],
                githubUrl: "https://github.com/prabhatjaidiya/job-tracker",
                liveUrl: "https://job-tracker-frontend-26wf.onrender.com",
                featured: true
            },
            {
                title: "Weather App",
                description:
                    "A modern responsive Progressive Web App for real-time weather information, forecasts, air quality, weather alerts, and weather insights. The application supports city search, current-location weather, hourly and 5-day forecasts, interactive charts, favorites, recent searches, and PWA functionality.",
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
                githubUrl: "https://github.com/prabhatjaidiya/Weather-App",
                liveUrl: "https://weather-app-7cfd.vercel.app/",
                featured: true,
            },
            {
                title: "Expense Tracker",
                description:
                    "A modern responsive personal finance application built with React, Vite, and Tailwind CSS. It provides transaction management, financial analytics, budget management, notifications, authentication, profile management, dark mode, and CSV/PDF exports. The application uses LocalStorage for client-side data persistence and includes a public demo mode.",
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
                githubUrl: "https://github.com/prabhatjaidiya/Expense-Tracker",
                liveUrl: "https://expense-tracker-lovat-pi.vercel.app/",
                featured: true,
            },
            {
                title: "Personal Portfolio",
                description:
                    "A modern responsive developer portfolio showcasing Prabhat Jaidiya's projects, technical skills, experience, and frontend development journey. It uses a minimal dark design with reusable components, responsive layouts, animations, interactive elements, and project showcases.",
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
                githubUrl: "https://github.com/prabhatjaidiya/portfolio",
                liveUrl: "https://portfolio-mocha-xi-f9ohsuh54e.vercel.app/",
                featured: true,
            },
            {
                title: "ShopSphere",
                description:
                    "A full-stack e-commerce platform currently in development. The project currently includes the React and TypeScript frontend foundation, Tailwind CSS, React Router, reusable components, customer layout, and initial customer routes.",
                technologies: [
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "React Router",
                ],
                githubUrl: "https://github.com/prabhatjaidiya/shopsphere",
                featured: true,
            },
        ];

        await Project.deleteMany({});
        await Project.insertMany(projects);

        console.log("Projects seeded successfully");

        const learning = [
            {
                topic: "Node.js → MERN Roadmap",
                description:
                    "A 42-day learning roadmap covering Node.js, Express.js, MongoDB, Mongoose, and the foundations required for MERN development.",
                status: "In Progress",
                progress: 76.19,
            },
            {
                topic: "ShopSphere",
                description:
                    "A 28-day full-stack e-commerce project focused on building an e-commerce platform with React, TypeScript, Tailwind CSS, React Router, TanStack Query, Node.js, Express, MongoDB, Mongoose, authentication, and role-based functionality.",
                status: "In Progress",
                progress: 17.86,
            },
            {
                topic: "Prabhat AI",
                description:
                    "A 28-day project-based learning journey focused on building a personal AI agent with structured personal data, retrieval, and later AI integration.",
                status: "In Progress",
                progress: 28.57,
            },
        ];

        await Learning.deleteMany({});
        await Learning.insertMany(learning);

        console.log("Learning data seeded successfully");
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    }
};

seedProfile();