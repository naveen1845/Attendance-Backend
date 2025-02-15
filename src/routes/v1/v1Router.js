import express from 'express'

import courseRouter from './courseRouter.js'
import userRouter from './userRouter.js'

const router = express.Router();

router.use('/user', userRouter);

router.use('/course', courseRouter)

export default router