import{
    Router
} from "express"
import{ uploadPDF }from "../controllers/multer.controllers"
import {
    uploads
} from "../middleware/multer"
import { protect } from "../middleware/auth.middleware"

const router= Router()

router.post('/pdf',protect,uploads.single("pdf"),uploadPDF)


export default router