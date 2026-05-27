import { Router } from "express";
import {registerUser,lginUser, getUser} from "../controllers/auth.controllers"
import { protect } from "../middleware/auth.middleware";

const router= Router()


router.post('/register',registerUser)

router.post('/login',lginUser)

router.get("/profile",protect,getUser)

export default router;
