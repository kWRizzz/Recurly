import notesModel from "../models/notes.model";
import {
    Response
} from "express"
import {
    CustomRequest
} from "../types/index"

export const uploadPDF = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "No file uploaded",
            });

            return;
        }

        res.status(200).json({
            success: true,

            file: req.file.filename,
        });
    } catch (error) {
        console.log(`error while uploading the file ${error}`);
        res.status(500).json({
            message: `eror whil e uploading the file ${error}`,
            success: false
        })
    }
}