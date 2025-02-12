import express from 'express'

import facultyRouter from './facultyRouter.js'

const router = express.Router();

router.use('/faculty', facultyRouter);

export default router