import FornecedoresServices from '../services/fornecedores.js';

export default class FornecedoresController {
    static async create(req, res) {
        const dados = {
            ...req.body,
            user_id: req.user.id
        };

        try {
            const newFornecedor = await FornecedoresServices.createFornecedor(dados);
            return res.status(201).json({
                message: "Fornecedor cadastrado com sucesso!",
                fornecedor: newFornecedor
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const fornecedores = await FornecedoresServices.findAllFornecedores();
            return res.status(200).json({
                message: "Busca de fornecedores realizada com sucesso",
                qtd: fornecedores.length,
                fornecedores: fornecedores
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const fornecedor = await FornecedoresServices.findFornecedorById(req.params.id);
            if (!fornecedor) return res.status(404).json({ error: "Fornecedor não encontrado" });

            return res.status(200).json(fornecedor);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getByUser(req, res) {
        try {
            const fornecedoresDoUsuario = await FornecedoresServices.findFornecedoresByUser(req.user.id);
            return res.status(200).json({
                message: "Busca de fornecedores realizada com sucesso",
                qtd: fornecedoresDoUsuario.length,
                fornecedores: fornecedoresDoUsuario
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const fornecedor = await FornecedoresServices.findFornecedorById(req.params.id);
            if (!fornecedor) return res.status(404).json({ error: "Fornecedor não encontrado" });

            const updated = await FornecedoresServices.updateFornecedor(req.params.id, req.body);
            return res.status(200).json({
                message: "Fornecedor atualizado com sucesso",
                fornecedor: updated
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const deletado = await FornecedoresServices.deleteFornecedor(req.params.id);
            if (!deletado) return res.status(404).json({ error: "Fornecedor não encontrado" });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
