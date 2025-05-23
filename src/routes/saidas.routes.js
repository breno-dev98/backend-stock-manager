import { Router } from "express";
import SaidasController from "../controllers/saidas.controllers.js";
import { validateUUID } from "../middlewares/validateUUID.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { autorizar } from "../middlewares/autorizar.js";

const router = Router();

// Criar nova saída
router.post(
    '/saidas',
    authMiddleware,
    autorizar('OWNER', 'ADMIN', 'ESTOQUISTA'),
    SaidasController.create
);

// Buscar saídas do usuário logado
router.get(
    '/saidas',
    authMiddleware,
    autorizar('OWNER', 'ADMIN', 'ESTOQUISTA'),
    SaidasController.getByUser
);

// Buscar saída por ID
router.get(
    '/saidas/:id',
    authMiddleware,
    autorizar('OWNER', 'ADMIN', 'ESTOQUISTA'),
    validateUUID,
    SaidasController.getById
);

// Buscar saídas por ID do produto
router.get(
    '/saidas/produto/:produto_id',
    authMiddleware,
    autorizar('OWNER', 'ADMIN', 'ESTOQUISTA'),
    validateUUID,
    SaidasController.getByProduto
);

// Atualizar saída
router.put(
    '/saidas/:id',
    authMiddleware,
    autorizar('OWNER', 'ADMIN'),
    validateUUID,
    SaidasController.update
);

// Deletar saída
router.delete(
    '/saidas/:id',
    authMiddleware,
    autorizar('OWNER', 'ADMIN'),
    validateUUID,
    SaidasController.delete
);

export default router;
