import express from 'express'

import { createAttendaceController, deleteAttendanceController, getAttendaceDetailsController, getCourseAttendanceRecordsController, updateAttendanceController } from '../../controllers/attendanceController.js'
import { isAuth } from '../../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/create', isAuth, createAttendaceController)

router.get('/:attendanceId', isAuth, getAttendaceDetailsController)

router.post('/:attendanceId', isAuth, updateAttendanceController)

router.post('/', isAuth, getCourseAttendanceRecordsController)

router.delete('/:attendanceId', isAuth, deleteAttendanceController)

export default router