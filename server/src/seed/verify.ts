import "dotenv/config";
import mongoose from "mongoose";

import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Learning from "../models/Learning.js";

const verifyData = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(mongoURI);

        const profile = await Profile.find();
        const skills = await Skill.find();
        const projects = await Project.find();
        const learning = await Learning.find();

        console.log("\n===== PRABHAT AI DATA VERIFICATION =====\n");

        console.log(`Profiles: ${profile.length}`);
        console.log(`Skills: ${skills.length}`);
        console.log(`Projects: ${projects.length}`);
        console.log(`Learning records: ${learning.length}`);

        console.log("\n===== PROFILE =====");
        console.log(JSON.stringify(profile, null, 2));

        console.log("\n===== SKILLS =====");
        console.log(JSON.stringify(skills, null, 2));

        console.log("\n===== PROJECTS =====");
        console.log(JSON.stringify(projects, null, 2));

        console.log("\n===== LEARNING =====");
        console.log(JSON.stringify(learning, null, 2));
    } catch (error) {
        console.error("Verification failed:", error);
    } finally {
        await mongoose.disconnect();
    }
};

verifyData();