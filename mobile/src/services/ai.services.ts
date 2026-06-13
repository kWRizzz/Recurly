import {
    api
} from './api'

import { 
    QuizQuestion
 } from "../types/quiz.types";
import { Flashcard } from "../types/flashcards.types";

export const askQuestion= async (
    notesId:string,
    question:string
) => {
    const response= await api.post(
        `/ai/chat/${notesId}`,
        { question }  
    ) 
    
    return response.data.answer;
}

export const generateQuiz = async (
    noteId:string
):Promise<QuizQuestion[]> => {
    const response= await api.post(
        `/ai/quiz/${noteId}`
    );

    return JSON.parse(
        response.data.quiz
    )
}

export const generateFlashcards = async (
    noteId: string
): Promise<Flashcard[]> => {
    const response = await api.post(
        `/ai/flashcards/${noteId}`
    );
    return response.data.flashcards;
}