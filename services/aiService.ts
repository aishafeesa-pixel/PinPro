
import { GoogleGenAI, Type } from "@google/genai";

export const generatePinMarketingContent = async (topic: string) => {
  try {
    // Fix: Move instantiation inside the function to ensure up-to-date configuration for each call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 5 viral Pinterest headlines and descriptions for: ${topic}. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              description: { type: Type.STRING },
              hexColor: { type: Type.STRING, description: 'Matching background hex color' }
            },
            required: ["headline", "description", "hexColor"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("AI Generation Error:", error);
    return null;
  }
};
