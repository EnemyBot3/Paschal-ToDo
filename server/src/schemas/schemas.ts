import { z } from 'zod';

export const TodoItemSchema = z.object({
    value: z.string(),
    checked: z.boolean()
});

export const CreateTodoSchema = z.object({
    title: z.string(),
    items: z.array(TodoItemSchema),
    author_id: z.number()
});

export const LoginSchema = z.object({
    username: z.string(),
    password: z.string()
});

export const RegisterSchema = z.object({
    username: z.string(),
    password: z.string()
});
