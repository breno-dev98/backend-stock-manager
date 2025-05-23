import SaidaServices from '../services/saidas.services.js';
import Produtos from '../models/produtos.js';

export default class SaidasController {
    static async create(req, res) {
        const { produto_id } = req.body;
        const dados = {
            ...req.body,
            user_id: req.user.id // associando a saída ao usuário logado
        };

        try {
            const produto = await Produtos.findByPk(produto_id);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            const novaSaida = await SaidaServices.createSaida(dados);
            return res.status(201).json({
                message: "Saída registrada com sucesso!",
                saida: novaSaida
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const saidas = await SaidaServices.findAllSaidas();
            return res.status(200).json({
                message: "Busca bem-sucedida",
                qtd: saidas.length,
                saidas
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const saida = await SaidaServices.findSaidaById(req.params.id);
            if (!saida) {
                return res.status(404).json({ error: "Saída não encontrada" });
            }
            return res.status(200).json(saida);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getByUser(req, res) {
        try {
            const saidas = await SaidaServices.findSaidaByUser(req.user.id);
            return res.status(200).json({
                message: "Busca de saídas por usuário bem-sucedida",
                qtd: saidas.length,
                saidas
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getByProduto(req, res) {
        try {
            const saidas = await SaidaServices.findSaidaByProduto(req.params.produto_id);
            return res.status(200).json({
                message: "Busca por produto bem-sucedida",
                qtd: saidas.length,
                saidas
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const saida = await SaidaServices.findSaidaById(req.params.id);
            if (!saida) {
                return res.status(404).json({ error: "Saída não encontrada" });
            }

            const atualizada = await SaidaServices.updateSaida(req.params.id, req.body);
            return res.status(200).json({
                message: "Saída atualizada com sucesso",
                saida: atualizada
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const deletada = await SaidaServices.deleteSaida(req.params.id);
            if (!deletada) {
                return res.status(404).json({ error: "Saída não encontrada" });
            }

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
