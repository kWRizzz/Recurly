import {
    Response
} from "express"
import { CustomRequest } from "../types"
import notesModel from "../models/notes.model"
import quizHistoryModel from "../models/quizHistory.model"


export const createNotes = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        let { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({
                message: "Enter Both content and title porperly",
                success: true
            });
            return;
        }
        if (!req.user) {
            res.status(401).json({
                message: "User not authenticated",
                success: false
            });
            return;
        }
        const user = req.user._id;
        const note = await notesModel.create({
            title,
            content,
            user
        })

        res.status(200).json({
            message: "Notes has been created",
            note,
            success: true
        })
    } catch (error) {
        console.log(`error while creating an notes ${error}`);
        res.status(500).json({
            message: `eror while creating a note ${error}`,
            success: false
        })
    }
}


export const getNotes = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        if (!req.user?._id) {
            res.status(400).json({
                message: "no user found while fetching the notes",
                success: false
            });
            return;
        }

        const notes = await notesModel.find({
            user: req.user?._id,
        }).sort({
            createdAt: -1
        })

        res.status(200).json({
            success: true,
            notes,
        });
    } catch (error) {
        console.log(`while fetching the notes an error occured`);
        res.status(500).json({
            message: `No notes has been fetched ${error}`,
            success: false
        })
    }
}


export const deleteNote = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        const note = await notesModel.findOneAndDelete({
            _id: req.params.id,
            user: req.user?._id
        })

        if (!note) {
            res.status(404).json({
                success: false,
                message: "Note not found",
            });

            return;
        }

        res.status(200).json({
            success: true,
            message: "Note deleted",
        });
    } catch (error) {
        console.log(`error while deleting the note${error}`);
        res.status(500).json({
            success: false,
            message: `cant del note ${error}`,
        });
    }
}


export const getNotesById= async (
    req:CustomRequest,
    res:Response
):Promise<void> => {
    try {
        
        const note= await notesModel.findOne({
            _id:req.params.id,
            user:req.user?._id
        })

        if(!note){
            res.status(400).json({
                message:"no notes found",
                success:false
            });
            return;
        }

         res.status(200).json({
            success: true,
            note
        });


    } catch (error) {
        console.log(`error occured your notes not found ${error}`);
        res.status(500).json({
            message:` no notes found of user ${error}`,
            success:false
        })
    }
}

export const createQuizHistory = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        const { noteId, noteTitle, score, totalQuestions } = req.body;
        if (!noteId || !noteTitle || score === undefined || !totalQuestions) {
            res.status(400).json({
                message: "Missing quiz history fields",
                success: false
            });
            return;
        }

        const quizHistory = await quizHistoryModel.create({
            user: req.user?._id,
            note: noteId,
            noteTitle,
            score,
            totalQuestions
        });

        res.status(201).json({
            message: "Quiz history saved",
            success: true,
            quizHistory
        });
    } catch (error) {
        console.log(`error saving quiz history ${error}`);
        res.status(500).json({
            message: `cant save quiz history ${error}`,
            success: false
        });
    }
}

export const getQuizHistory = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        const history = await quizHistoryModel.find({
            user: req.user?._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            history
        });
    } catch (error) {
        console.log(`error getting quiz history ${error}`);
        res.status(500).json({
            message: `cant get quiz history ${error}`,
            success: false
        });
    }
}