import express from 'express';
import { updateTask, deleteTask } from '../controller/taskController.js';

const router = express.Router();

router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
