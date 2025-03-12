import express from 'express'

import { createAttendaceController, getCourseAttendanceRecordsController } from '../../controllers/attendanceController.js'
import { isAuth } from '../../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/create', isAuth, createAttendaceController)

router.get('/', isAuth, getCourseAttendanceRecordsController)

export default router