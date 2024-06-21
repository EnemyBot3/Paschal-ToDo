import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../utils/prismaClient';
import { LoginSchema, RegisterSchema } from '../schemas/schemas';

const router = express.Router();

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = LoginSchema.parse(req.body);

    try {
        const user = await prisma.todo_users.findFirst({ where: {username}  });

        if (!user)
        { return res.status(401).send({ error: 'Invalid username or password' });}

        const isPasswordValid = await bcrypt.compare(password, user?.password);
        
        if (!isPasswordValid) 
        { return res.status(401).send({ error: 'Invalid username or password' }); }

        res.status(201).send({ username, userId: user.id });

    } catch (error) { next(error); }
});

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = RegisterSchema.parse(req.body);

    try {
        const user = await prisma.todo_users.findFirst({ where: {username}  });

        if (user)
        { return res.status(401).send({ error: 'Username already taken' });}

        try {
            const newUser = await prisma.todo_users.create({
                data: {
                    username,
                    password: bcrypt.hashSync(password, 1)
                }
            });
    
            res.status(201).send({ username: newUser.username, userId: newUser.id });

        } catch (error) { next(error); }

    } catch (error) { next(error); }
});

export default router;