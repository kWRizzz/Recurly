import {
    Response
} from "express"
import {
    CustomRequest
} from "../types/index"
import notesModel from "../models/notes.model"
import { askQuestion, generateQuiz } from "../services/gemini.service"


export const getQuize = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        const note = await notesModel.findOne({
            _id: req.params.noteId,
            user: req.user?._id
        })

        if (!note) {
            res.status(201).json({
                message: "User nhi mila",
                success: false
            });
            return;
        }

        const quiz= await generateQuiz(
            note.content
        )

        res.status(200).json({
            message:"your quiz submintted",
            success:true,
            quiz
        })
    } catch (error) {
        console.log(`cant generate quiz sorr :( ${error}`);
        res.status(500).json({
            message: `cant gen qunbbiz ${error}`,
            success: false
        })
    }
}

export const chatWithNotes = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        const { question } = req.body;

        const note = await notesModel.findById({
            _id: req.params.noteId,
            user: req.user?._id
        })

        if (!note) {
            res.status(200).json({
                message: "no notes found on your account ",
                success: false
            });
            return;
        }

        const answer = await askQuestion(
            note.content,
            question
            
        )

        res.status(200).json({
            message:"question aswered",
            success: true,
            answer,
        });
    } catch (error) {
        console.log(`some error occured in talking ${error}`);
        res.status(500).json({
            message: `some error occured in talking ${error}`,
            success: false
        })
    }
}