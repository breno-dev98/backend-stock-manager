import fornecedores from "../models/fornecedores.js";

export default class FornecedoresRepository {
    static async create(data) {
        return await fornecedores.create(data);
    }

    static async findAll() {
        return await fornecedores.findAll();
    }

    static async findByName(nome) {
        return await fornecedores.findOne({ where: { nome } });
    }

    static async findById(id) {
        return await fornecedores.findByPk(id);
    }

    static async findByUser(id) {
        return await fornecedores.findAll({ where: { user_id: id } });
    }

    static async update(id, data) {
        const fornecedor = await fornecedores.findByPk(id);
        if (!fornecedor) return null;

        await fornecedores.update(data, { where: { id } });
        const fornecedorAtulizado = await fornecedores.findByPk(id)
        return fornecedorAtulizado;
    }

    static async delete(id) {
        const fornecedor = await fornecedores.findByPk(id);
        if (!fornecedor) return null;

        await fornecedores.destroy({ where: { id } });
        return true;
    }
}
