import express from 'express'

import { createCourseController } from '../../controllers/courseController.js';
import { isAuth } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuth, createCourseController)

export default router