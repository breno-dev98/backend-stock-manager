import categorias from "../models/categorias.js";

export default class CategoriaRepository {
    static async create(data) {
        return await categorias.create(data);
    }

    static async findAll() {
        return await categorias.findAll();
    }

    static async findByName(nome) {
        return await categorias.findOne({ where: { nome } });
    }

    static async findById(id) {
        return await categorias.findByPk(id);
    }

    static async findByUser(id) {
        return await categorias.findAll({where: {user_id: id}})
    }

    static async update(id, data) {
        const categoria = await categorias.findByPk(id);
        if (!categoria) return null;

        await categorias.update(data, { where: { id } });
        return categoria;
    }

    static async delete(id) {
        const categoria = await categorias.findByPk(id);
        if (!categoria) return null;

        await categorias.destroy({ where: { id } });
        return true;
    }
}