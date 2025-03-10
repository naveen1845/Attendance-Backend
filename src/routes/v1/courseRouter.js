import express from 'express'

import { addStudentsToCourseController, createCourseController, getAllFacultyCoursesController } from '../../controllers/courseController.js';
import { isAuth } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuth, createCourseController)

router.post('/addStudents', isAuth, addStudentsToCourseController);

router.get('/', isAuth, getAllFacultyCoursesController);

export default router