import { Router } from "express";
import ProdutosController from "../controllers/produtos.controllers.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { autorizar } from "../middlewares/autorizar.js"


const router = Router()

router.post('/produtos', authMiddleware, autorizar('OWNER', 'ADMIN'), ProdutosController.create);
router.get('/produtos', authMiddleware, autorizar('OWNER', 'ADMIN', 'MODERADOR', 'FUNCIONARIO', 'CLIENT'), ProdutosController.getByUser);
router.get('/produtos/:id', authMiddleware, autorizar('OWNER', 'ADMIN', 'MODERADOR', 'FUNCIONARIO', 'CLIENT'), validateUUID, ProdutosController.getById);
router.put('/produtos/:id', authMiddleware, autorizar('OWNER', 'ADMIN', 'MODERADOR'), validateUUID, ProdutosController.update);
router.delete('/produtos/:id', authMiddleware, autorizar('OWNER', 'ADMIN', 'MODERADOR'), validateUUID, ProdutosController.delete)

export default router;