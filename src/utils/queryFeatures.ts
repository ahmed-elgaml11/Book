import { BookFeatures } from '../types/bookFeatures'
import { QueryParams } from '../types/bookFeatures'
import { ParsedQs } from 'qs'
import { Prisma } from '../../generated/prisma'
export class APIFeatures {
    public queryStr: ParsedQs
    public query: BookFeatures
    constructor(queryStr: ParsedQs) {
        this.queryStr = queryStr
        this.query = {}
    }
    filter() {
        const queryObj = { ...this.queryStr }
        
        const excludedFields = ['sort', 'page', 'limit', 'select', 'offset']
        excludedFields.forEach((ele) => delete queryObj[ele])

        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)

        const word = JSON.parse(queryString)

        if(word.year)   word.year = Number(word.year)
        if (word.search) {
            this.query.where = {
                name: {
                    contains: word.search
                }
            }
        }
        delete word.search
        
        this.query.where = {
            ...this.query.where,
            ...word
        }


        return this
    }
    sort() {
        if (this.queryStr.sort && typeof this.queryStr.sort == 'string') {
            this.query.orderBy = [] 
            const sorted = this.queryStr.sort.split(',')
            sorted.forEach(ele => {
                if (ele.startsWith('-')) {
                    const field = ele.slice(1)
                    this.query.orderBy!.push({
                        [field]: 'desc'
                    })
                } else {
                    this.query.orderBy!.push({
                        [ele]: 'asc'
                    })
                }
            })
        }
        return this

    }
    select() {
        if (this.queryStr.select && typeof this.queryStr.select === 'string') {
            const selected: string[] = this.queryStr.select.split(',')
            const select: Record<string, boolean> = {};

            selected.forEach((key) => {
                select[key] = true;
            });

            this.query.select = select as Prisma.BookSelect;
        }
        return this

    }

    paginate() {
        const page: number = Number(this.queryStr.page) || 1;
        const limit: number = Number(this.queryStr.limit) || 100;
        const skip = (page - 1) * limit
        this.query.skip = skip
        this.query.take = limit
        return this
    }

}