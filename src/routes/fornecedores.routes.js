// src/routes/fornecedores.routes.js
import { Router } from "express";
import FornecedoresController from "../controllers/fornecedores.controllers.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/fornecedores', authMiddleware, FornecedoresController.create);
router.get('/fornecedores', authMiddleware, FornecedoresController.getByUser);
router.get('/fornecedores/:id', authMiddleware, validateUUID, FornecedoresController.getById);
router.put('/fornecedores/:id', authMiddleware, validateUUID, FornecedoresController.update);
router.delete('/fornecedores/:id', authMiddleware, validateUUID, FornecedoresController.delete);

export default router;
