import { GoogleGenAI, Modality } from '@google/genai';

// Helper to decode audio
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Generate Video using Veo
export const generateVideo = async (prompt: string): Promise<string> => {
  const aistudio = (window as any).aistudio;
  if (!aistudio) {
    throw new Error("AI Studio environment not detected");
  }

  const hasKey = await aistudio.hasSelectedApiKey();
  if (!hasKey) {
    throw new Error("API_KEY_MISSING");
  }

  // Create client immediately before call to ensure key is fresh
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  // Polling loop
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) throw new Error("Failed to generate video URI");

  // Fetch the actual MP4 bytes using the key
  const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

// Generate Image using Gemini 2.5 Flash Image
export const generateImage = async (prompt: string): Promise<string> => {
   // Assuming key is selected via the global mechanism for simplicity in this demo app context,
   // though typically Imagen doesn't strictly enforce the "Paid GCP Project" selector UI like Veo unless using specific high-end endpoints.
   // We will use the standard GenAI init.
   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

   const response = await ai.models.generateContent({
     model: 'gemini-2.5-flash-image',
     contents: {
       parts: [{ text: prompt }]
     },
     config: {
        imageConfig: {
            aspectRatio: "16:9",
            // imageSize is not supported in gemini-2.5-flash-image
        }
     }
   });

   for (const part of response.candidates?.[0]?.content?.parts || []) {
     if (part.inlineData) {
       return `data:image/png;base64,${part.inlineData.data}`;
     }
   }
   throw new Error("No image generated");
};

// Generate Speech
export const generateSpeech = async (text: string, voice: string = 'Kore'): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voice },
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if(!base64Audio) throw new Error("No audio generated");

    const audioBytes = decode(base64Audio);
    const blob = new Blob([audioBytes], { type: 'audio/wav' }); // PCM usually wrapped or raw, simple blob for playback
    // Note: Raw PCM often needs a WAV header for browser <audio> playback. 
    // For simplicity in this demo, we assume the browser can handle the blob or we'd add a WAV header.
    // However, the Gemini API output for TTS is often usable directly via MediaSource or by wrapping in a container.
    // A robust solution involves adding a RIFF header. Let's return the blob URL.
    
    return URL.createObjectURL(blob); 
};

export const promptSelectKey = async () => {
  const aistudio = (window as any).aistudio;
  if (aistudio) {
    await aistudio.openSelectKey();
  } else {
      console.warn("AI Studio host not found");
  }
}

export const checkKey = async () => {
    const aistudio = (window as any).aistudio;
    if(aistudio) {
        return await aistudio.hasSelectedApiKey();
    }
    return !!process.env.API_KEY;
}