import express from 'express'

import { createAttendaceController, getAttendaceDetailsController, getCourseAttendanceRecordsController, updateAttendanceController } from '../../controllers/attendanceController.js'
import { isAuth } from '../../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/create', isAuth, createAttendaceController)

router.get('/:attendanceId', isAuth, getAttendaceDetailsController)

router.post('/:attendanceId', isAuth, updateAttendanceController)

router.get('/', isAuth, getCourseAttendanceRecordsController)

export default router