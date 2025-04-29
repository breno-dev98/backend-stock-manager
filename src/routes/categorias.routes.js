import { Router } from "express";
import CategoriaController from "../controllers/categorias.controllers.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = Router()

router.post('/categorias', authMiddleware, CategoriaController.create);
router.get('/categorias', authMiddleware, CategoriaController.getByUser);
router.get('/categorias/:id', authMiddleware, validateUUID, CategoriaController.getById);
router.put('/categorias/:id', authMiddleware, validateUUID, CategoriaController.update);
router.delete('/categorias/:id', authMiddleware, validateUUID, CategoriaController.delete)

export default router;