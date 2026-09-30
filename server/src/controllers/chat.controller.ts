import { Request, Response } from "express";
import { generateAIResponse } from "../services/ai.service";

export const chatController = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const response = await generateAIResponse(message.trim());

        return res.status(200).json({
            success: true,
            response,
        });
    } catch (error) {
        console.error("Chat controller error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while processing your message",
        });
    }
};