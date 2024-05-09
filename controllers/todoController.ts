import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTodos = async (req: Request, res: Response) => {
    try{
        const todos = await prisma.todo.findMany();
        res.json(todos);
    } 
    catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    const { title, status } = req.body;
    try {
        const todo = await prisma.todo.create({
            data: {
                title,
                status: status || false,
            },
        });
        res.status(201).json(todo);
    } 
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if(!todo){
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, status } = req.body;
    try {
        const updatedTodo = await prisma.todo.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                status,
            },
        });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.todo.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json({ message: 'Todo deleted successfully' });
    } 
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
