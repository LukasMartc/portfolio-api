import express from 'express';
import { createAdmin, login, verifyToken } from '../controllers/userControllers.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/new-admin', checkAuth, createAdmin);
router.post('/login', login);
router.get('/verify-token', checkAuth, verifyToken);

export default router;