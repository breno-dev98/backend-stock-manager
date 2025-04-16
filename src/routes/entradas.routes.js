import { Router } from "express";
import EntradasController from "../controllers/entradas.controllers.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { autorizar } from "../middlewares/autorizar.js";

const router = Router();

// Criar nova entrada
router.post(
    '/entradas',
    authMiddleware,
    autorizar('OWNER', 'ADMIN', 'MODERADOR', 'FUNCIONARIO'),
    EntradasController.create
);

// Buscar entradas do usuário logado
router.get(
    '/entradas',
    authMiddleware,
    autorizar('OWNER', 'ADMIN', 'MODERADOR', 'FUNCIONARIO'),
    EntradasController.getByUser
);

// Buscar entrada por ID
router.get(
    '/entradas/:id',
    authMiddleware,
    autorizar('OWNER', 'ADMIN', 'MODERADOR', 'FUNCIONARIO'),
    validateUUID,
    EntradasController.getById
);

// Buscar entradas por ID do produto
router.get(
    '/entradas/produto/:produto_id',
    authMiddleware,
    autorizar('OWNER', 'ADMIN', 'MODERADOR'),
    validateUUID,
    EntradasController.getByProduto
);

// Atualizar entrada
router.put(
    '/entradas/:id',
    authMiddleware,
    autorizar('OWNER', 'ADMIN'),
    validateUUID,
    EntradasController.update
);

// Deletar entrada
router.delete(
    '/entradas/:id',
    authMiddleware,
    autorizar('OWNER', 'ADMIN'),
    validateUUID,
    EntradasController.delete
);

export default router;
