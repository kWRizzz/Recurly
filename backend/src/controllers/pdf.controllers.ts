import { PDFParse } from "pdf-parse"
import fs from "fs"
import {
    Response
} from "express"
import {
    CustomRequest
} from "../types/index"
import notesModel from "../models/notes.model"
import {
    generateSummary
} from "../services/gemini.service"



export const processPdf = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({
                message: "no file found while uploading the pdf",
                success: false
            });
            return;
        };
        const dataBuffer = fs.readFileSync(
            req.file.path
        )

        const parser = new PDFParse({ data: new Uint8Array(dataBuffer) })
        const pdfContent = await parser.getText()
        const extract = pdfContent.text

        const summary = await generateSummary(extract.toString());

        const note = await notesModel.create({
            title: req.file.originalname,
            content: extract.toString(),
            summary,
            fileUrl: req.file.path,
            user: req.user?._id,
        })

        res.status(201).json({
            message:"succes in sumarising pdf",
            note,
            success:true
        })

    } catch (error) {
        console.log(`error in ai processing your pdf  ${error}`);
        res.status(500).json({
            message: `cannot process the pdf ${error}`,
            success: false
        })
    }
}