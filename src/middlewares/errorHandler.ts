import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/customeError";
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = (err.statusCode && err.statusCode !== 200) ? err.statusCode : 500;
    err.status = err.status || 'error';

    res.status(err.statusCode);
    res.json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
    
};

export default errorHandler;