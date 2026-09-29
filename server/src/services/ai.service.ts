import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateResponse = async (message: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: message,
    });

    return response.text;
};