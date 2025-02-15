import express from 'express'

import { userSignInController, userSignUpController } from '../../controllers/userController.js';


const router = express.Router();

router.post('/signup', userSignUpController);

router.post('/signin', userSignInController);

export default router