import { Router } from "express";
import {registerUser,lginUser} from "../controllers/auth.controllers"

const router= Router()


router.post('/register',registerUser)

router.post('/login',lginUser)


export default router;
