import ProdutoServices from '../services/produtos.services.js'

export default class ProdutosController {
    static async create(req, res) {
        const dados = {
            ...req.body,
            user_id: req.user.id
        }
        try {

            const newProduto = await ProdutoServices.createProduto(dados);
            return res.status(201).json({ message: "Cadastro bem-sucedido!", produtos: newProduto })
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
                const errors = error.errors.map(err => err.message);
                return res.status(400).json({ errors });
            }
            return res.status(500).json({ error: 'Erro interno no servidor' })
        }
    }

    static async getAll(req, res) {
        try {
            const produtos = await ProdutoServices.findAllProdutos()
            return res.status(200).json({ message: "Busca bem-sucedida", qtd: produtos.length, produtos: produtos })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async getById(req, res) {
        try {
            const produto = await ProdutoServices.findProdutoById(req.params.id)
            if (!produto) return res.status(404).json({ error: "produto não encontrado" });

            return res.status(200).json(produto)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async getByUser(req, res) {
        try {
            const produtoByUser = await ProdutoServices.findProdutoByUser(req.user.id)
            res.status(200).json({ message: "Busca bem-sucedida", qtd: produtoByUser.length, produtos: produtoByUser })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async update(req, res) {
        try {
            const produto = await ProdutoServices.findProdutoById(req.params.id)
            if (!produto) return res.status(404).json({ error: "produto não encontrado" });

            const updated = await ProdutoServices.updateProduto(req.params.id, req.body)
            return res.status(200).json({ message: "Marca atualizada com sucesso", user: updated })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async delete(req, res) {
        try {
            const deletado = await ProdutoServices.deleteProduto(req.params.id)
            if (!deletado) return res.status(404).json({ error: "produto não encontrado" });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }


}
