import Entradas from "../models/entradas.js";

export default class EntradasRepository {
    static async create(data) {
        return await Entradas.create(data);
    }

    static async findAll() {
        return await Entradas.findAll();
    }

    static async findById(id) {
        return await Entradas.findByPk(id);
    }

    static async findByProduto(produto_id) {
        return await Entradas.findAll({ where: { produto_id } });
    }

    static async findByUser(user_id) {
        return await Entradas.findAll({ where: { user_id } });
    }

    static async update(id, data) {
        const entrada = await Entradas.findByPk(id);
        if (!entrada) return null;

        await Entradas.update(data, { where: { id } });
        return entrada;
    }

    static async delete(id) {
        const entrada = await Entradas.findByPk(id);
        if (!entrada) return null;

        await Entradas.destroy({ where: { id } });
        return true;
    }
}
