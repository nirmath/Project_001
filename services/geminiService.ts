
import { GoogleGenAI } from "@google/genai";
import { Property } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not found in environment variables. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDescription = async (property: Property): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please set up your environment variables.";
  }

  const model = 'gemini-2.5-flash';
  const prompt = `
    You are a professional real estate copywriter. Write a compelling and attractive property listing description for a ${
      property.type === 'sale' ? 'property for sale' : 'rental property'
    }.
    
    Highlight its best features in a warm and inviting tone. Do not just list the features; weave them into a narrative.
    The description should be approximately 3-4 paragraphs long.
    
    Here are the property details:
    - Title: ${property.title}
    - Location: ${property.address.street}, ${property.address.city}
    - Price: $${property.price.toLocaleString()}${property.type === 'rent' ? '/month' : ''}
    - Bedrooms: ${property.bedrooms}
    - Bathrooms: ${property.bathrooms}
    - Area: ${property.area} sqft
    
    Base your writing on this brief initial description: "${property.description}"
    
    Generate the description now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    return "Sorry, we couldn't generate a description at this time. Please try again later.";
  }
};
