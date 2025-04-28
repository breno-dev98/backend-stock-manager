import { Router } from "express";
import UsuarioController from "../controllers/usuarios.controllers.js";
import { validate } from "../middlewares/validateRequest.js";
import { usuarioSchema } from "../validations/usuario.schema.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { verificarCriacaoUsuarioPermitida } from "../middlewares/verificarCriacaoUsuarioPermitida.js";


const router = Router()

router.post('/usuarios', authMiddleware, verificarCriacaoUsuarioPermitida, UsuarioController.create);
router.get('/usuarios', authMiddleware, UsuarioController.getAll);
router.get('/usuarios/:id', authMiddleware, validateUUID, UsuarioController.getById);
router.put('/usuarios/:id', authMiddleware, validateUUID, UsuarioController.update);
router.delete('/usuarios/:id', authMiddleware, validateUUID, UsuarioController.delete)

export default router;