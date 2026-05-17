import { Router } from "express";
import * as controllers from '../controllers/authController'

const router = Router()
router.post('/login', controllers.login)

export default router