import createTask from '../controllers/task/taskController.js';
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/task/create', protect, createTask);

export default router;