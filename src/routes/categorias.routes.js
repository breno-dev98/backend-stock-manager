import { Router } from "express";
import CategoriaController from "../controllers/categorias.controllers.js";
import { validate } from "../middlewares/validateRequest.js";
import { categoriaSchema } from "../validations/categoria.schema.js";
import { validateUUID } from "../middlewares/validateUUID.js";

const router = Router()

router.post('/categorias', validate(categoriaSchema), CategoriaController.create);
router.get('/categorias', CategoriaController.getAll);
router.get('/categorias/:id', validateUUID, CategoriaController.getById);
router.put('/categorias/:id', validateUUID, validate(categoriaSchema), CategoriaController.update);
router.delete('/categorias/:id', validateUUID, CategoriaController.delete)

export default router;