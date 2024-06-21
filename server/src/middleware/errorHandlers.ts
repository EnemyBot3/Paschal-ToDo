import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({ message: `Something went wrong trying to fetch ${req.url}` });
};
