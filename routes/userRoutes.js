import express from 'express';
import { createAdmin, /* login, */ } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/new-admin', createAdmin)
// router.post('/login', login);
// router.post('/verify-token', passport, verifyToken);

export default router;