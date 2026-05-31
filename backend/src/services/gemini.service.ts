import {
    GoogleGenAI
} from "@google/genai"
import {
    env
} from "../config/env"

const ai = new GoogleGenAI({
    apiKey: env.geminiApiKey
})


export const generateSummary = async (
    text: string
): Promise<string> => {
    const respone = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize the following notes in simple student-friendly language. ${text}`
    })

    return respone.text || ""
}

