import { GoogleGenAI } from "@google/genai";
import { PRABHAT_AI_SYSTEM_PROMPT } from "../config/systemPrompt";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateAIResponse(
    message: string,
    knowledge: unknown
) {
    try {
        const context = JSON.stringify(knowledge, null, 2);

        const prompt = `
Personal Knowledge Context:
${context}

User Question:
${message}
`;

        console.log("Prompt diagnostics:", {
            messageLength: message.length,
            knowledgeLength: context.length,
            promptLength: prompt.length,
        });

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                systemInstruction: PRABHAT_AI_SYSTEM_PROMPT,
            },
        });

        console.log("Gemini response:", response.text);

        return response.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}