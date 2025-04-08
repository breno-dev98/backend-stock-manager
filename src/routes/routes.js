import { Router } from "express";
import usuriosRoutes from './usuarios.routes.js'

const router = Router();

router.use(usuriosRoutes);



export default router;