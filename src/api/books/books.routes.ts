import express from "express";
const router = express.Router();
import * as bookController from './bookes.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { createBodySchema, getBodySchema, updateBodySchema } from "./book.schema";
router.route('/')
    .get( bookController.getAll)
    .post(validateRequest(createBodySchema), bookController.addOne)

router.route('/:id')
    .get(validateRequest(getBodySchema), bookController.getOne)
    .put(validateRequest(updateBodySchema), bookController.updateOne)
    .delete(validateRequest(getBodySchema), bookController.deleteOne)

export default router