import {
    api
} from './api'


export const askQuestion= async (
    notesId:string,
    question:string
) => {
    const response= await api.post(
        `/ai/chat/${notesId}`,
        question  
    ) 
    
    return response.data.answer;
}