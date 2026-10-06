import { Request, Response } from "express";
import { generateRAGResponse } from "../services/ai.service.js";
import { retrieveKnowledge } from "../services/knowledge.service.js";

export const chatController = async (
    req: Request,
    res: Response
) => {
    try {
        const { message } = req.body;

        if (
            !message ||
            typeof message !== "string" ||
            !message.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const cleanMessage = message.trim();

        // 1. Retrieve relevant knowledge
        const knowledge =
            await retrieveKnowledge(cleanMessage);

        console.log("Retrieved knowledge:", knowledge);

        // 2. Stop if no relevant semantic knowledge exists
        if (!knowledge.hasRelevantKnowledge) {
            return res.status(200).json({
                success: true,
                response:
                    "I don't have enough information in my current knowledge to answer that question.",
            });
        }

        // 3. Prepare RAG context
        const context = JSON.stringify(
            {
                profile: knowledge.profile,
                results: knowledge.results,
            },
            null,
            2
        );

        // 4. Generate grounded response
        const response = await generateRAGResponse(
            cleanMessage,
            context
        );

        return res.status(200).json({
            success: true,
            response,
        });
    } catch (error) {
        console.error("Chat controller error:", error);

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while processing your message",
        });
    }
};