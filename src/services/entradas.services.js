import EntradasRepository from "../repositories/entradas.repository.js";
import ProdutosRepository from "../repositories/produtos.repository.js";

export default class EntradaServices {
    static async createEntrada(data) {
        const { produto_id, quantidade } = data;
        const produto = await ProdutosRepository.findById(produto_id);
        if (!produto) {
            throw new Error("Produto não encontrado");
        }
        const novaQuantidade = parseFloat(produto.quantidade) + parseFloat(quantidade);
        await ProdutosRepository.update(produto_id, { quantidade: novaQuantidade });
        const novaEntrada = await EntradasRepository.create(data);
        return novaEntrada;
    }

    static async findAllEntradas() {
        return await EntradasRepository.findAll();
    }

    static async findEntradaByUser(user_id) {
        return await EntradasRepository.findByUser(user_id);
    }

    static async findEntradaByProduto(produto_id) {
        return await EntradasRepository.findByProduto(produto_id);
    }

    static async findEntradaById(id) {
        return await EntradasRepository.findById(id);
    }

    static async updateEntrada(id, data) {
        return await EntradasRepository.update(id, data);
    }

    static async deleteEntrada(id) {
        return await EntradasRepository.delete(id);
    }
}
