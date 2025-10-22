import { Opportunity } from '../types';

export const generateActionPlan = async (opportunities: Opportunity[]): Promise<string> => {
  try {
    // Call the Netlify serverless function instead of the Gemini API directly
    const response = await fetch('/.netlify/functions/generate-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ opportunities }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Function Error:", errorData);
      throw new Error(errorData.error || 'La solicitud a la función falló');
    }

    const data = await response.json();
    return data.plan;

  } catch (error) {
    console.error("Error al llamar a la función de Netlify:", error);
    return "Hubo un error al generar el plan de acción. Por favor, intenta de nuevo más tarde.";
  }
};
