import express from 'express'

import { facultySignUpController } from '../../controllers/facultyController.js';

const router = express.Router();

router.post('/signup', facultySignUpController);

export default router