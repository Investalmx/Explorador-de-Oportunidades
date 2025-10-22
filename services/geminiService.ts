
import { GoogleGenAI } from "@google/genai";
import { Opportunity } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateActionPlan = async (opportunities: Opportunity[]): Promise<string> => {
  if (!API_KEY) {
    return "Error: API_KEY no configurada. Por favor, configura la variable de entorno API_KEY.";
  }
  
  const opportunitiesText = opportunities
    .map((op, index) => `${index + 1}. ${op.title}: ${op.recommendation}`)
    .join('\n');

  const prompt = `
    Actúa como un consultor financiero experto para una pequeña o mediana empresa.
    Basado en las siguientes oportunidades financieras identificadas, genera un plan de acción sugerido, conciso y práctico.
    El plan debe ser fácil de entender y enfocado en los próximos 90 días.
    Organiza el plan en pasos claros. Usa un tono profesional pero alentador.

    Oportunidades Identificadas:
    ${opportunitiesText}

    Genera el plan de acción ahora.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Hubo un error al generar el plan de acción. Por favor, intenta de nuevo más tarde.";
  }
};
