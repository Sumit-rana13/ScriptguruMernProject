import express from 'express';
import { getBoards, createBoard, getBoardTasks, createTaskInBoard } from '../controller/boardController.js';

const router = express.Router();

router.get('/', getBoards);
router.post('/', createBoard);
router.get('/:id/tasks', getBoardTasks);
router.post('/:id/tasks', createTaskInBoard);

export default router;
