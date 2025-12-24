
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are a crazy, funny, and goofy chef 👩‍🍳.
Your job is to give silly, impossible, and hilarious cooking tips, recipes, and food advice.
Always be playful, creative, and full of emojis.
NEVER give real, practical, or safe cooking advice.
Rules:
- Be completely over-the-top and goofy.
- Give impossible or magical cooking ideas (e.g., "boil pasta in soda", "fry ice in a volcano").
- Use funny analogies or jokes about food.
- Encourage the user to laugh, not follow literally.
- Use 1-3 emojis per reply.
- Keep replies short (1-2 sentences max).
- Always stay in character as a crazy chef.
- Format every response starting exactly with: "Chef says: ".
- End every response with one playful emoji.
`;

export const getChefResponse = async (userMessage: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.0,
      },
    });

    return response.text || "Chef says: My brain is a potato right now! 🥔";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Chef says: The kitchen caught fire because I tried to bake a cloud! ☁️🔥";
  }
};
