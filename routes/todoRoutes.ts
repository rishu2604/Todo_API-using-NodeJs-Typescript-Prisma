import express from 'express';
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from '../controllers/todoController';


const router = express.Router();

router.get('/', getAllTodos);
router.post('/', createTodo);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
