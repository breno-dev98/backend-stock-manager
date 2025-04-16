import { Router } from "express";
import usuriosRoutes from './usuarios.routes.js'
import categoriasRoutes from './categorias.routes.js'
import marcasRoutes from './marca.routes.js'
import authRoutes from './auth.routes.js'
import fornecedorRoutes from './fornecedores.routes.js'
import produtosRoutes from './produtos.routes.js'
import entradasRoutes from './entradas.routes.js'

const router = Router();

router.use(usuriosRoutes);
router.use(categoriasRoutes);
router.use(authRoutes);
router.use(marcasRoutes);
router.use(fornecedorRoutes);
router.use(produtosRoutes);
router.use(entradasRoutes);



export default router;