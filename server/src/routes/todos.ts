import express, { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prismaClient';
import { determineComplete } from '../utils/utils';
import { CreateTodoSchema } from '../schemas/schemas';

const router = express.Router();

// Route to get all todos
router.get("/getAllTodos", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await prisma.todos.findMany();
        res.send({ todos });        
    } catch (error) {
        next(error);
    }
});

// Route to get a todo by id
router.get("/getTodoById/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const todo = await prisma.todos.findUnique({ where: { id: Number(id) } });
        if (todo) {
            res.send({ todo });
        } else {
            res.status(404).send({ error: 'Todo not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Route to get all todos by user
router.get("/getAllUserTodos/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    try {
        const todos = await prisma.todos.findMany({ where: { author_id: Number(id) } });
        if (todos) {
            res.send({ todos });
        } else {
            res.status(404).send({ error: 'Todo not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Route update a todo items by id
router.patch("/updateTodoItemsById/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { items } = req.body;

    try {
        const todo = await prisma.todos.findUnique({ where: { id: Number(id) } });
        if (!todo) {
            res.status(404).send({ error: 'Todo not found' });
            return;
        }

        const updatedTodo = await prisma.todos.update({
            where: { id: Number(id) },
            data: {
                completed: determineComplete(items),
                items: items.map((item: any) => ({  // Adjust 'any' to match your TodoItem type
                    value: item.value,
                    checked: item.checked
                }))
            },
        });

        res.send({ data: updatedTodo });
    } catch (error) {
        next(error);
    }
});

// Route to create a new todo
router.post("/createTodo", async (req: Request, res: Response, next: NextFunction) => {
    const { title, items, author_id } = CreateTodoSchema.parse(req.body);

    try {
        const newTodo = await prisma.todos.create({
            data: {
                title,
                items: items.map((item: any) => ({  // Adjust 'any' to match your TodoItem type
                    value: item.value,
                    checked: item.checked
                })),
                author_id,
                date: new Date(),
                completed: determineComplete(items)
            }
        });

        res.status(201).send({ todo: newTodo });
    } catch (error) {
        next(error);
    }
});

// Route to delete a todo by id
router.delete("/deleteTodo/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const todo = await prisma.todos.findUnique({ where: { id: Number(id) } });

        if (!todo) {
            res.status(404).send({ error: 'Todo not found' });
            return;
        }

        await prisma.todos.delete({ where: { id: Number(id) } });

        res.status(200).send({ message: 'Todo deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export default router;
