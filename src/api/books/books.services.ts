import { PrismaClient } from '../../../generated/prisma'
import { Book } from '../../types/bookResponse'
const prisma = new PrismaClient()
import { BookFeatures } from '../../types/bookFeatures'


const book = prisma.book

export const getAll = async(query: BookFeatures) => {
    return book.findMany({
        ...query
    })
}

export const addBook = async (body: Book) => {
    return book.create({
        data: body
    })
}

export const getBook = async (author: string) => {
    return book.findUnique({where: {author}})
}

export const getBookById = async (id: string) => {
    return book.findUnique({where: {id}})
}

export const updateBook = async (id: string, body: Book) => {
    return book.update({
        where: {
            id
        },
        data: body
    })
}

export const deleteBook = async (id: string) => {
    return book.delete({
        where: {
            id
        }
    })
}