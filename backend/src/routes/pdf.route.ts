import {
    Router
} from "express"
import { protect } from "../middleware/auth.middleware"
import { processPdf } from "../controllers/pdf.controllers"
import {
    uploads
} from "../middleware/multer"
import {
    chatWithNotes,
    getQuize,
    getFlashcards
} from "../controllers/ai.controllers"

const router = Router()

router.post("/pdfupload", protect, uploads.single("pdf"), processPdf)

router.post(
    "/quiz/:noteId",
    protect,
    getQuize
)

router.post(
    "/chat/:noteId",
    protect,
    chatWithNotes
)

router.post(
    "/flashcards/:noteId",
    protect,
    getFlashcards
)

export default router