import Saidas from "../models/saidas.js";

export default class SaidasRepository {
    static async create(data) {
        return await Saidas.create(data);
    }

    static async findAll() {
        return await Saidas.findAll();
    }

    static async findById(id) {
        return await Saidas.findByPk(id);
    }

    static async findByProduto(produto_id) {
        return await Saidas.findAll({ where: { produto_id } });
    }

    static async findByUser(user_id) {
        return await Saidas.findAll({ where: { user_id } });
    }

    static async update(id, data) {
        const saida = await Saidas.findByPk(id);
        if (!saida) return null;

        await Saidas.update(data, { where: { id } });
        return saida;
    }

    static async delete(id) {
        const saida = await Saidas.findByPk(id);
        if (!saida) return null;

        await Saidas.destroy({ where: { id } });
        return true;
    }
}
