import express from 'express'

import { getAllStudentsController, userSignInController, userSignUpController } from '../../controllers/userController.js';
import { isAuth } from '../../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/signup', userSignUpController);

router.post('/signin', userSignInController);

router.get('/students', isAuth, getAllStudentsController);

export default router