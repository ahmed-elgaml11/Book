import z from 'zod'

const bookBodySchema = z.object({
    author: z.string().min(1, 'author is required'),
    pages: z.number().int().positive({message: 'pages must be a positive number'}).optional(),
    language: z.enum(['arabic', 'english', 'french']).default('arabic')
}).strict()


export const createBodySchema = z.object({
    body: bookBodySchema,
    params: z.object({}),
    query: z.object({})
}).strict()

export const getBodySchema = z.object({
    body: z.object({}),
    params: z.object({
        id:z
        .string().regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
            'Invalid UUID v4 format' ),
    }),
    query: z.object({})
}).strict()

export const updateBodySchema = z.object({
    body: bookBodySchema,
    params: z.object({
        id:z
        .string().regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
            'Invalid UUID v4 format' ),
    }),
    query: z.object({})
}).strict()