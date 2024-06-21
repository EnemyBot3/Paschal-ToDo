import request from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from '../utils/prismaClient';
import { errorHandler } from '../middleware/errorHandlers';
import todoRoutes from '../routes/todos'

// Initialize the app
dotenv.config();
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use('/api', todoRoutes);
app.use(errorHandler);

const userId = 1;

// Tests for Todos routes
describe('Todos API', () => {

    // Close the Prisma connection after all tests
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should get all todos', async () => {
        const res = await request(app).get('/api/getAllTodos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('todos');
    });

    it('should get a todo by id', async () => {
        const id = userId;
        const res = await request(app).get(`/api/getTodoById/${id}`);
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error', 'Todo not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('todo');
        }
    });

    it('should create a new todo', async () => {
        const newTodo = {
            title: 'Test Todo',
            items: [{ value: 'Test Item 1', checked: false }],
            author_id: userId,
        };

        const res = await request(app)
            .post('/api/createTodo')
            .send(newTodo);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('todo');
    });

    it('should update a todo items by id', async () => {
        const id = userId;
        const updatedItems = [{ value: 'Updated Item 1', checked: true }];

        const res = await request(app)
            .patch(`/api/updateTodoItemsById/${id}`)
            .send({ items: updatedItems });

        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error', 'Todo not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
        }
    });

    it('should delete a todo by id', async () => {
        const id = userId;

        const res = await request(app).delete(`/api/deleteTodo/${id}`);
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error', 'Todo not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Todo deleted successfully');
        }
    });
});
