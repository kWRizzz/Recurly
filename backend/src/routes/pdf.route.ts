import {
    Router
} from "express"
import { protect } from "../middleware/auth.middleware"
import { uploadPDF } from "../controllers/multer.controllers"
import { processPdf } from "../controllers/pdf.controllers"
import {
    uploads
} from "../middleware/multer"
import {
    chatWithNotes,
    getQuize
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

export default router