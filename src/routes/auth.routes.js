import express from 'express';
import AuthController from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/login', AuthController.login);

export default router;
