import {
    Router
} from "express"
import { createNotes, deleteNote, getNotes } from "../controllers/notes.controllers"
import { protect } from "../middleware/auth.middleware"

const router= Router()

router.post("/",protect,createNotes)

router.get("/",protect,getNotes)

router.get("/:id",protect,deleteNote)


export default router