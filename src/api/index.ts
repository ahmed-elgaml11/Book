import express from "express";
import {firstResponse} from "../types/firstResponse";
import bookRoutes from './books/book.routes'

const router = express.Router();

router.get<{}, firstResponse>('/', (req, res) => {
    res.json({
        message: 'hello from api.'
    })
})

router.use('/books', bookRoutes)
export default router