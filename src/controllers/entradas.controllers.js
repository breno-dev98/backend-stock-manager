import EntradaServices from '../services/entradas.services.js';

export default class EntradasController {
    static async create(req, res) {
        const dados = {
            ...req.body,
            user_id: req.user.id // associando a entrada ao usuário logado
        };

        try {
            const novaEntrada = await EntradaServices.createEntrada(dados);
            return res.status(201).json({
                message: "Entrada registrada com sucesso!",
                entrada: novaEntrada
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const entradas = await EntradaServices.findAllEntradas();
            return res.status(200).json({
                message: "Busca bem-sucedida",
                qtd: entradas.length,
                entradas
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const entrada = await EntradaServices.findEntradaById(req.params.id);
            if (!entrada) {
                return res.status(404).json({ error: "Entrada não encontrada" });
            }
            return res.status(200).json(entrada);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getByUser(req, res) {
        try {
            const entradas = await EntradaServices.findEntradaByUser(req.user.id);
            return res.status(200).json({
                message: "Busca de entradas por usuário bem-sucedida",
                qtd: entradas.length,
                entradas
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getByProduto(req, res) {
        try {
            const entradas = await EntradaServices.findEntradaByProduto(req.params.produto_id);
            return res.status(200).json({
                message: "Busca por produto bem-sucedida",
                qtd: entradas.length,
                entradas
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const entrada = await EntradaServices.findEntradaById(req.params.id);
            if (!entrada) {
                return res.status(404).json({ error: "Entrada não encontrada" });
            }

            const atualizada = await EntradaServices.updateEntrada(req.params.id, req.body);
            return res.status(200).json({
                message: "Entrada atualizada com sucesso",
                entrada: atualizada
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const deletada = await EntradaServices.deleteEntrada(req.params.id);
            if (!deletada) {
                return res.status(404).json({ error: "Entrada não encontrada" });
            }

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
