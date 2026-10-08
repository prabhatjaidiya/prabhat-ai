import { Request, Response } from "express";
import { generateRAGResponse } from "../services/ai.service.js";
import { retrieveKnowledge } from "../services/knowledge.service.js";
import {
    addMessage,
    getConversationHistory,
} from "../services/memory.service.js";

export const chatController = async (
    req: Request,
    res: Response
) => {
    try {
        const { message, conversationId } = req.body;

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

        if (
            !conversationId ||
            typeof conversationId !== "string" ||
            !conversationId.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID is required",
            });
        }

        const cleanMessage = message.trim();
        const cleanConversationId =
            conversationId.trim();

        // 1. Get previous conversation history
        const conversationHistory =
            getConversationHistory(
                cleanConversationId
            );

        console.log(
            "Conversation history:",
            conversationHistory
        );

        // 2. Retrieve relevant knowledge
        const knowledge =
            await retrieveKnowledge(cleanMessage);

        console.log(
            "Retrieved knowledge:",
            knowledge
        );

        // 3. Prepare RAG context
        const context = JSON.stringify(
            {
                profile: knowledge.profile,
                results: knowledge.results,
            },
            null,
            2
        );

        // 4. Generate response using
        // conversation history + RAG context
        const response =
            await generateRAGResponse(
                cleanMessage,
                context,
                conversationHistory
            );

        // 5. Save user message
        addMessage(cleanConversationId, {
            role: "user",
            content: cleanMessage,
        });

        // 6. Save assistant response
        addMessage(cleanConversationId, {
            role: "assistant",
            content: response,
        });

        return res.status(200).json({
            success: true,
            response,
        });
    } catch (error) {
        console.error(
            "Chat controller error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while processing your message",
        });
    }
};