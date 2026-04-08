import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateHeroImage() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A high-energy competition scene with young contestants in a colorful outdoor arena, neon lighting (blue and pink), dramatic shadows, and vibrant game-show style environment. People look excited and competitive. Cinematic, modern, inspired by viral YouTube challenge videos. No logos, no real people, no text.',
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
  return null;
}
