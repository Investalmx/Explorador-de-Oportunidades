import type { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

// La API_KEY debe ser configurada en las variables de entorno del sitio de Netlify
const { API_KEY } = process.env;

if (!API_KEY) {
  throw new Error("La variable de entorno API_KEY no está configurada.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  try {
    const { opportunities } = JSON.parse(event.body || '{}');

    if (!opportunities || !Array.isArray(opportunities)) {
       return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Faltan datos de oportunidades o son inválidos' }),
       };
    }

    const opportunitiesText = opportunities
      .map((op: any, index: number) => `${index + 1}. ${op.title}: ${op.recommendation}`)
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

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ plan: response.text }),
    };

  } catch (error) {
    console.error("Error en la función de Netlify:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Hubo un error al generar el plan de acción en el servidor." }),
    };
  }
};

export { handler };
