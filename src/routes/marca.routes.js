import { Router } from "express";
import MarcasController from "../controllers/marcas.controllers.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { autorizar } from "../middlewares/autorizar.js"


const router = Router()

router.post('/marcas', authMiddleware, autorizar('OWNER', 'ADMIN'), MarcasController.create);
router.get('/marcas', authMiddleware, autorizar('OWNER', 'ADMIN', 'MODERADOR', 'FUNCIONARIO', 'CLIENT'), MarcasController.getByUser);
router.get('/marcas/:id', authMiddleware, autorizar('OWNER', 'ADMIN', 'MODERADOR', 'FUNCIONARIO', 'CLIENT'), validateUUID, MarcasController.getById);
router.put('/marcas/:id', authMiddleware, autorizar('OWNER', 'ADMIN', 'MODERADOR'), validateUUID, MarcasController.update);
router.delete('/marcas/:id', authMiddleware, autorizar('OWNER', 'ADMIN', 'MODERADOR'), validateUUID, MarcasController.delete)

export default router;