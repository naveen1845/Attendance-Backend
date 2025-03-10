import express from 'express'

import { createAttendaceController } from '../../controllers/attendanceController.js'
import { isAuth } from '../../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/create', isAuth, createAttendaceController)

export default router