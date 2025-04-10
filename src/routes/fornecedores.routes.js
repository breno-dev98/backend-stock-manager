// src/routes/fornecedores.routes.js
import { Router } from "express";
import FornecedoresController from "../controllers/fornecedores.controllers.js";
import { validate } from "../middlewares/validateRequest.js";
import { fornecedorSchema } from "../validations/fornecedor.schema.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/fornecedores', authMiddleware, validate(fornecedorSchema), FornecedoresController.create);
router.get('/fornecedores', authMiddleware, FornecedoresController.getByUser);
router.get('/fornecedores/:id', authMiddleware, validateUUID, FornecedoresController.getById);
router.put('/fornecedores/:id', authMiddleware, validateUUID, validate(fornecedorSchema), FornecedoresController.update);
router.delete('/fornecedores/:id', authMiddleware, validateUUID, FornecedoresController.delete);

export default router;
