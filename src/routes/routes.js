import { Router } from "express";
import usuriosRoutes from './usuarios.routes.js'
import categoriasRoutes from './categorias.routes.js'
import authRoutes from './auth.routes.js'

const router = Router();

router.use(usuriosRoutes);
router.use(categoriasRoutes);
router.use(authRoutes);



export default router;