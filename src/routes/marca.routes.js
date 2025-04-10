import { Router } from "express";
import MarcasController from "../controllers/marcas.controllers.js";
import { validate } from "../middlewares/validateRequest.js";
import { marcaSchema } from "../validations/marca.schema.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = Router()

router.post('/marcas', authMiddleware, validate(marcaSchema), MarcasController.create);
router.get('/marcas', authMiddleware, MarcasController.getAll);
router.get('/marcas/:id', authMiddleware, validateUUID, MarcasController.getById);
router.put('/marcas/:id', authMiddleware, validateUUID, validate(marcaSchema), MarcasController.update);
router.delete('/marcas/:id', authMiddleware, validateUUID, MarcasController.delete)

export default router;