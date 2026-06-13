// import * as FileSystem from "expo-file-system";
// for future use 
import { api } from "./api";
import{
    Note
} from "../types/note.types"


export const getNotes= async ():Promise<Note[]> => {
    const response= await api.get("/notes")
    return response.data.notes;
}

export const uploadPdf = async (
    file:{
        uri:string,
        name:string,
        mimiType?:string
    }
) => {
    const formData= new FormData()

    formData.append(
        "pdf",
        {
            uri:file.uri,
            name:file.name,
            type:file.mimiType || "application/pdf" 
        } as any 
    )

    const response = await api.post("/ai/pdfupload",
        formData
    )

    return response.data
}

export const getNotesById= async (
    id:string
) => {
    const respone= await api.get(
        `/notes/${id}`
    )

    return respone.data.note    
}

export const deleteNote= async (
    id:string
) => {
    const respone = await api.delete(
        `/notes/${id}`
    )

    return respone.data
}