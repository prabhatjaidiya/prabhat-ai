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

export async function generateRAGResponse(
    question: string,
    context: string
): Promise<string> {
    try {
        const prompt = `
Retrieved Knowledge:
${context}

User Question:
${question}

Answer the user's question using the retrieved knowledge.

Rules:
- Use the retrieved knowledge as the primary source.
- Do not invent personal information.
- Do not assume facts that are not supported by the retrieved knowledge.
- If the retrieved knowledge does not contain enough information,
  clearly say that the information is not available in your current knowledge.
- If the retrieved knowledge does not contain enough information
  to answer the question, do not infer that the information is
  false or that the person does not have that experience.
- State that the information is not available in the current knowledge.
- Never answer "yes" or "no" to a factual question about
  personal information unless the retrieved knowledge explicitly
  supports that conclusion.
- When information is missing, say that it is not available in
  the current knowledge instead of inferring a negative answer.

Provide a clear and natural answer.
`;

        console.log("RAG Prompt diagnostics:", {
            questionLength: question.length,
            contextLength: context.length,
            promptLength: prompt.length,
        });

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                systemInstruction: PRABHAT_AI_SYSTEM_PROMPT,
            },
        });

        console.log("Gemini RAG response:", response.text);

        return response.text || "I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini RAG API Error:", error);
        throw error;
    }
}