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

export const generateQuiz = async (
    text: string
): Promise<string> => {
    const respone = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:
            `
            Generate 5 MCQ questions from the notes.

Return ONLY valid JSON.

Format:

[
 {
   "question":"...",
   "options":["A","B","C","D"],
   "answer":"A"
 }
]

Notes:

${text}
        `
    })

    return respone.text || ""
}


export const askQuestion = async (
    notes: string,
    question: string
): Promise<string> => {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
            You are a study assistant.

Answer ONLY from the notes below.

If answer is not present say:

"I couldn't find that in your  notes."

NOTES:

${notes}

QUESTION:

${question}
        `
    })

    return response.text || ""
}