import { Router } from "express";
import UsuarioController from "../controllers/usuarios.controllers.js";
import { validate } from "../middlewares/validateRequest.js";
import { usuarioSchema } from "../validations/usuario.schema.js";
usuarioSchema


const router = Router()

router.post('/usuarios', validate(usuarioSchema),  UsuarioController.create);

export default router;