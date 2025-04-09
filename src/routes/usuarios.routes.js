import { Router } from "express";
import UsuarioController from "../controllers/usuarios.controllers.js";
import { validate } from "../middlewares/validateRequest.js";
import { usuarioSchema } from "../validations/usuario.schema.js";
import { validateUUID } from "../middlewares/validateUUID.js";

const router = Router()

router.post('/usuarios', validate(usuarioSchema), UsuarioController.create);
router.get('/usuarios', UsuarioController.getAll);
router.get('/usuarios/:id', validateUUID, UsuarioController.getById);
router.put('/usuarios/:id', validateUUID, validate(usuarioSchema), UsuarioController.update);
router.delete('/usuarios/:id', validateUUID, UsuarioController.delete)

export default router;