import { Request, Response, NextFunction } from 'express';
import { catchAsync } from "../../utils/catchAsync";
import * as Services from './books.services'
import { bookResponse } from '../../types/bookResponse';
import { CustomError } from '../../types/customeError';
import { APIFeatures } from '../../utils/queryFeatures';

export const getAll = catchAsync(async (req: Request, res: Response<bookResponse>, next: NextFunction) => {
    const query = new APIFeatures(req.query)
        .filter()
        .sort()
        .select()
        .paginate()
        .query
    const books = await Services.getAll(query);
    res.status(200).json({
        status: 'success',
        data: {
            books
        }
    })

})

export const addOne = catchAsync(async (req: Request, res: Response<bookResponse>, next: NextFunction) => {
    const exitBook = await Services.getBook(req.body.author)
    if (exitBook) {
        const error: CustomError = new Error('this author is exists');
        error.statusCode = 400
        throw error
    }
    const book = await Services.addBook(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            book
        }
    })
})

export const getOne = catchAsync(async (req: Request, res: Response<bookResponse>, next: NextFunction) => {
    const id = req.params.id
    const book = await Services.getBookById(id)
    if (!book) {
        const error: CustomError = new Error('this book is not exists');
        error.statusCode = 404
        throw error
    }
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })

})

export const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const { author } = req.body
    const book = await Services.getBookById(id)
    if (!book) {
        const error: CustomError = new Error('this book is not exists');
        error.statusCode = 400
        throw error
    }
    if (author && author != book.author) {
        const exitBook = await Services.getBook(author)
        if (exitBook) {
            const error: CustomError = new Error('this author is exists');
            error.statusCode = 400
            throw error
        }
    }

    const updatedBook = await Services.updateBook(book.id, req.body)

    res.status(200).json({
        status: 'success',
        data: {
            updatedBook
        }
    })

})
export const deleteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const book = await Services.getBookById(id)
    if (!book) {
        const error: CustomError = new Error('this book is not exists');
        error.statusCode = 400
        throw error
    }

    await Services.deleteBook(id)

    res.status(204).json({
        status: 'success',
        data: {

        }
    })

})

