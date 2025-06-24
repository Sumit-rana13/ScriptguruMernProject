import Board from '../models/Board.js';
import Task from '../models/Task.js';

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};

export const createBoard = async (req, res) => {
  const board = new Board({ name: req.body.name });
  await board.save();
  res.status(201).json(board);
};

export const getBoardTasks = async (req, res) => {
  const { id } = req.params;
  const tasks = await Task.find({ boardId: id });
  res.json(tasks);
};

export const createTaskInBoard = async (req, res) => {
  const task = new Task({ ...req.body, boardId: req.params.id });
  await task.save();
  res.status(201).json(task);
};
