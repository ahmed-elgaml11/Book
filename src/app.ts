import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.join(__dirname, '../.env')})
import api from './api/index'
import errorHandler from './middlewares/errorHandler'
import { CustomError } from './types/customeError'
const app = express()


app.use(express.json());



app.use('/api/v1', api)


app.all('/{*any}', (req, res, next) => {
    const error : CustomError = new Error(`Not Found - ${req.originalUrl}`)
    error.statusCode = 404
    next(error)
})

app.use(errorHandler)




const  PORT  = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})