import { Router } from "express";
import MarcasController from "../controllers/marcas.controllers.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { autorizar } from "../middlewares/autorizar.js"


const router = Router()

router.post('/marcas', authMiddleware, autorizar('OWNER', 'ADMIN'), MarcasController.create);
router.get('/marcas', authMiddleware, autorizar('OWNER', 'ADMIN', 'ESTOQUISTA', 'COMPRADOR', 'CLIENT'), MarcasController.getByUser);
router.get('/marcas/:id', authMiddleware, autorizar('OWNER', 'ADMIN', 'ESTOQUISTA', 'COMPRADOR', 'CLIENT'), validateUUID, MarcasController.getById);
router.put('/marcas/:id', authMiddleware, autorizar('OWNER', 'ADMIN', 'ESTOQUISTA'), validateUUID, MarcasController.update);
router.delete('/marcas/:id', authMiddleware, autorizar('OWNER', 'ADMIN', 'ESTOQUISTA'), validateUUID, MarcasController.delete)

export default router;