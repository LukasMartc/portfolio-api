import express from 'express';
import { 
    getAllProjects, 
    createProject, 
    updateProject, 
    deleteProject } 
from '../controllers/projectControllers.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/')
    .get(getAllProjects)
    .post(checkAuth, createProject)

router.route('/:id')
    .put(checkAuth, updateProject)
    .delete(checkAuth, deleteProject)

export default router;