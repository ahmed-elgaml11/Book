import { AnyZodObject, z } from 'zod';
import { catchAsync } from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/customeError';
import * as Services from '../api/books/books.services'
export const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        })
        if (!result.success) {
            console.log(result.error.errors)
            const msgs = result.error.errors.map(err => {
                return `${err.path.slice(-1)[0]}: ${err.message}`
            }).join(',  ');

            const err: CustomError = new Error(`validation error: ${msgs}`)
            err.statusCode = 400
            throw err
        }
        next()
    })
}