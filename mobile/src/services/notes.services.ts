// import * as FileSystem from "expo-file-system";
// for future use 
import { api } from "./api";

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

    const response = await api.post("",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    )

    return response.data
}