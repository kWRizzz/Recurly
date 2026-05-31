import {
    Router
} from "express"
import { protect } from "../middleware/auth.middleware"
import { uploadPDF } from "../controllers/multer.controllers"
import { processPdf } from "../controllers/pdf.controllers"
import {
    uploads
} from "../middleware/multer"

const router= Router()

router.post("/pdfupload",protect,uploads.single("pdf"),processPdf)

export default router