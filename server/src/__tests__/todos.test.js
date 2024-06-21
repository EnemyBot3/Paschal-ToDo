"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prismaClient_1 = require("../utils/prismaClient");
const errorHandlers_1 = require("../middleware/errorHandlers");
const todos_1 = __importDefault(require("../routes/todos"));
// Initialize the app
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', todos_1.default);
app.use(errorHandlers_1.errorHandler);
const userId = 1;
// Tests for Todos routes
describe('Todos API', () => {
    // Close the Prisma connection after all tests
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.prisma.$disconnect();
    }));
    it('should get all todos', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/api/getAllTodos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('todos');
    }));
    it('should get a todo by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = userId;
        const res = yield (0, supertest_1.default)(app).get(`/api/getTodoById/${id}`);
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error', 'Todo not found');
        }
        else {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('todo');
        }
    }));
    it('should create a new todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const newTodo = {
            title: 'Test Todo',
            items: [{ value: 'Test Item 1', checked: false }],
            author_id: userId,
        };
        const res = yield (0, supertest_1.default)(app)
            .post('/api/createTodo')
            .send(newTodo);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('todo');
    }));
    it('should update a todo items by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = userId;
        const updatedItems = [{ value: 'Updated Item 1', checked: true }];
        const res = yield (0, supertest_1.default)(app)
            .patch(`/api/updateTodoItemsById/${id}`)
            .send({ items: updatedItems });
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error', 'Todo not found');
        }
        else {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
        }
    }));
    it('should delete a todo by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = userId;
        const res = yield (0, supertest_1.default)(app).delete(`/api/deleteTodo/${id}`);
        if (res.statusCode === 404) {
            expect(res.body).toHaveProperty('error', 'Todo not found');
        }
        else {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Todo deleted successfully');
        }
    }));
});
