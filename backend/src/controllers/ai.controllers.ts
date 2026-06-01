import{
    Response
}from "express"
import{
    CustomRequest
} from "../types/index"
import notesModel from "../models/notes.model"


const getQuize= async (
    req:CustomRequest,
    res:Response
):Promise<void> => {
    try {
        const note = await notesModel.findOne({
            _id:req.params.noteId,
            user:req.user?._id
        })

        if(!note){
            res.status(201).json({
                message:"User nhi mila",
                success:false
            });
            return;
        }
    } catch (error) {
        console.log(`cant generate quiz sorr :( ${error}`);
        res.status(500).json({
            message:`cant gen quiz ${error}`,
            success:false
        })
    }
}