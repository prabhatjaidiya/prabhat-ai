import { GoogleGenAI } from "@google/genai";
import { PRABHAT_AI_SYSTEM_PROMPT } from "../config/systemPrompt";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateAIResponse(message: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message,
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