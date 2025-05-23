import SaidasRepository from "../repositories/saidas.repository.js";
import ProdutosRepository from "../repositories/produtos.repository.js";

export default class SaidaServices {
    static async createSaida(data) {
        const { produto_id, quantidade } = data;

        const produto = await ProdutosRepository.findById(produto_id);
        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        const estoqueAtual = parseFloat(produto.quantidade);
        const quantidadeSaida = parseFloat(quantidade);

        if (estoqueAtual < quantidadeSaida) {
            throw new Error("Quantidade insuficiente em estoque");
        }

        const novaQuantidade = estoqueAtual - quantidadeSaida;

        await ProdutosRepository.update(produto_id, { quantidade: novaQuantidade });

        const novaSaida = await SaidasRepository.create(data);
        return novaSaida;
    }

    static async findAllSaidas() {
        return await SaidasRepository.findAll();
    }

    static async findSaidaByUser(user_id) {
        return await SaidasRepository.findByUser(user_id);
    }

    static async findSaidaByProduto(produto_id) {
        return await SaidasRepository.findByProduto(produto_id);
    }

    static async findSaidaById(id) {
        return await SaidasRepository.findById(id);
    }

    static async updateSaida(id, data) {
        return await SaidasRepository.update(id, data);
    }

    static async deleteSaida(id) {
        return await SaidasRepository.delete(id);
    }
}
