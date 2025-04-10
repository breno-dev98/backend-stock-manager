import FornecedoresRepository from "../repositories/fornecedores.repository.js";

export default class FornecedoresServices {
    static async createFornecedor(data) {
        const fornecedorExists = await FornecedoresRepository.findByName(data.nome);
        if (fornecedorExists) {
            throw new Error("Fornecedor já cadastrado");
        }

        return await FornecedoresRepository.create(data);
    }

    static async findAllFornecedores() {
        return await FornecedoresRepository.findAll();
    }

    static async findFornecedoresByUser(id) {
        return await FornecedoresRepository.findByUser(id);
    }

    static async findFornecedorById(id) {
        return await FornecedoresRepository.findById(id);
    }

    static async updateFornecedor(id, data) {
        return await FornecedoresRepository.update(id, data);
    }

    static async deleteFornecedor(id) {
        return await FornecedoresRepository.delete(id);
    }
}
