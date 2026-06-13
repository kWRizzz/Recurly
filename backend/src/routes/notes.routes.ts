import {
    Router
} from "express"
import { createNotes, deleteNote, getNotes, getNotesById, createQuizHistory, getQuizHistory } from "../controllers/notes.controllers"
import { protect } from "../middleware/auth.middleware"

const router= Router()

router.post("/",protect,createNotes)

router.get("/",protect,getNotes)

router.post("/quiz-history", protect, createQuizHistory)

router.get("/quiz-history", protect, getQuizHistory)

router.get("/:id",protect,getNotesById)

router.delete("/:id",protect,deleteNote)


export default router