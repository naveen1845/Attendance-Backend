import express from 'express'

import attendanceRouter from './attendaceRouter.js'
import courseRouter from './courseRouter.js'
import userRouter from './userRouter.js'

const router = express.Router();

router.use('/user', userRouter);

router.use('/course', courseRouter)

router.use('/attendance', attendanceRouter);

export default router