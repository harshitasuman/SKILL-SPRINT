
import { GoogleGenAI, Type } from "@google/genai";
import { SprintContent, Skill } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateDailySprint(skill: Skill): Promise<SprintContent> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a 5-minute learning sprint for a beginner learning ${skill.name} in an Indian context. 
    Focus on one specific micro-concept. Use relatable examples like UPI, local startups, or college life in India.
    Include a concept explanation, a specific example, a small practical task, and a 1-question quiz.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          concept: { type: Type.STRING, description: "A concise explanation of the concept." },
          example: { type: Type.STRING, description: "A relatable example from an Indian context." },
          task: { type: Type.STRING, description: "A short 1-minute task for the user to do." },
          quiz: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              answer: { type: Type.INTEGER, description: "Index of the correct option (0-3)." },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "answer", "explanation"]
          }
        },
        required: ["concept", "example", "task", "quiz"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function askTutor(question: string, context: string): Promise<string> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Context: You are a friendly Indian mentor. The student is learning: ${context}. Question: ${question}`,
    config: {
      systemInstruction: "Keep answers very short, encouraging, and use Hinglish if appropriate (occasional Hindi words written in English like 'Theek hai', 'Samjhe?')."
    }
  });
  return response.text || "Sorry, I couldn't process that. Please try again.";
}
