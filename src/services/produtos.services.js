import ProdutosRepository from "../repositories/produtos.repository.js";

export default class ProdutoServices {
    static async createProduto(data) {        
        return await ProdutosRepository.create(data)
    }

    static async findAllProdutos() {
        return await ProdutosRepository.findAll(req)
    }
    static async findProdutoByUser(id) {
        return await ProdutosRepository.findByUser(id)
    }

    static async findProdutoById(id) {
        return await ProdutosRepository.findById(id)
    }

    static async updateProduto(id, data) {
       return await ProdutosRepository.update(id, data)
    }

    static async deleteProduto(id) {
       return await ProdutosRepository.delete(id)

    }
}