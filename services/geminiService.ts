
import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully,
  // perhaps with a UI element to input the key.
  // For this context, we assume it's set.
  console.warn("API_KEY environment variable is not set. Using a placeholder. Please provide your API key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const editImageWithPrompt = async (
  imageFile: File,
  prompt: string
): Promise<string> => {
  try {
    const base64Image = await fileToBase64(imageFile);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: imageFile.type,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        // The API returns PNG data
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }

    throw new Error("No image data found in the API response.");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
