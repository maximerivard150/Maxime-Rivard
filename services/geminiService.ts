
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Variable d'environnement API_KEY non définie pour l'API Gemini. Les fonctionnalités IA seront désactivées.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDynamicDescription = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("L'air est chargé d'une odeur d'ozone et d'histoires inédites. (IA Désactivée)");
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Erreur lors de la génération de contenu avec Gemini:", error);
    return "Une étrange interférence bloque votre perception, le monde semble statique et sans réponse.";
  }
};
