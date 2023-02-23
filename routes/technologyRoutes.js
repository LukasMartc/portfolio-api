import express, { Router } from 'express';
import {
    getAllTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology
} from '../controllers/technologyControllers.js'
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/')
    .get(getAllTechnologies)
    .post(checkAuth, createTechnology)

router.route('/:id')
    .put(checkAuth, updateTechnology)
    .delete(checkAuth, deleteTechnology)

export default router;