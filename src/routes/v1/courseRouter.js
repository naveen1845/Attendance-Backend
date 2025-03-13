import express from 'express'

import { addStudentsToCourseController, createCourseController, getAllFacultyCoursesController, getCourseWithStudentsDetailsController } from '../../controllers/courseController.js';
import { isAuth } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuth, createCourseController)

router.post('/updateStudents', isAuth, addStudentsToCourseController);

router.get('/', isAuth, getAllFacultyCoursesController);

router.get('/:courseId', isAuth, getCourseWithStudentsDetailsController)

export default router