import "dotenv/config";
import mongoose from "mongoose";
import { retrieveKnowledge } from "../services/knowledge.service.js";

const testRetrieval = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(mongoURI);

        console.log("MongoDB connected\n");

        const questions = [
            "Who is Prabhat?",
            "What technologies does Prabhat know?",
            "What projects has Prabhat built?",
            "What is Prabhat currently learning?",
        ];

        for (const question of questions) {
            console.log("================================");
            console.log("Question:", question);

            const result = await retrieveKnowledge(question);

            console.log("Result:");
            console.dir(result, { depth: null });
        }
    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("\nMongoDB disconnected");
    }
};

testRetrieval();